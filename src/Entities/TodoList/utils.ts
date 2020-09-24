import {
  ClientId,
  Options,
  TodoInstance,
  Todo,
  ComparasionResult,
  CompareFunction,
  OrderId,
} from './types';

const defaultIdCreator = (): ClientId => {
  return (Math.random() * 1000).toString();
};

const cloneOptions = (options: Options): Options => {
  const result: Options = {
    mask: new Set(options.mask.values()),
    sortType: 'ByAddition',
  };

  return result;
};

const DEFAULT_OPTIONS: Options = {
  mask: new Set([]),
  sortType: 'ByAddition',
};

const compareDateFunction: CompareFunction<OrderId> = (date1: OrderId, date2: OrderId): ComparasionResult => {
  if (date1 < date2) {
    return -1;
  } else if (date1 > date2) {
    return 1;
  } else {
    return 0;
  }
};

const compareClientIdFunction: CompareFunction<ClientId> = (clientId1: ClientId, clientId2: ClientId): ComparasionResult => {
  const id1: number = parseInt(clientId1);
  const id2: number = parseInt(clientId2);

  if (id1 < id2) {
    return -1;
  } else if (id1 > id2) {
    return 1;
  } else {
    // Untested, because we using set of client ids
    return 0;
  }
};

const convertTodoMapToSortedArray = (collection: Map<ClientId, TodoInstance>, options: Options): Todo[] => {
  type TodoWithSortParams = Todo & { orderId: OrderId };
  const { mask, sortType } = options;
  const unsortedResult: TodoWithSortParams[] = [];

  for (let clientId of mask) {
    if (!collection.has(clientId)) {
      continue;
    }

    const todoInstance: TodoInstance = collection.get(clientId);

    unsortedResult.push({
      id: clientId,
      text: todoInstance.text,
      status: todoInstance.status,
      orderId: todoInstance.orderId,
    });
  }

  let result: Todo[] = unsortedResult.sort((left: TodoWithSortParams, right: TodoWithSortParams): ComparasionResult => {
    if (sortType === 'ByAddition') {
      return compareDateFunction(left.orderId, right.orderId);
    }

    return compareClientIdFunction(left.id, right.id);
  }).map((todo: TodoWithSortParams): Todo => {
    return {
      id: todo.id,
      text: todo.text,
      status: todo.status,
    };
  });

  return result;
};

export {
  defaultIdCreator,
  cloneOptions,
  DEFAULT_OPTIONS,
  convertTodoMapToSortedArray,
};
