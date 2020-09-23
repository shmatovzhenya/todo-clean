import { ClientId, Options, TodoInstance, Todo, ComparasionResult, CompareFunction } from './types';

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

const compareDateFunction: CompareFunction<Date> = (date1: Date, date2: Date): ComparasionResult => {
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
    return 1;
  } else if (id1 > id2) {
    return -1;
  } else {
    return 0;
  }
};

const convertTodoMapToSortedArray = (collection: Map<ClientId, TodoInstance>, options: Options): Todo[] => {
  type TodoWithSortParams = Todo & { date: Date };
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
      date: todoInstance.pubDate,
    });
  }

  let result: Todo[] = unsortedResult.sort((left: TodoWithSortParams, right: TodoWithSortParams): ComparasionResult => {
    if (sortType === 'ByAddition') {
      return compareDateFunction(left.date, right.date);
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
