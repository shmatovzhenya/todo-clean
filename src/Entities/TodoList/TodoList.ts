import {
  TodoStatus,
  ClientId,
  Text,
  Todo,
  TodoInstance,
  Options,
} from './types';

import { DEFAULT_OPTIONS, defaultIdCreator, convertTodoMapToSortedArray } from './utils';


class TodoList {
  constructor(
    private collection: Map<ClientId, TodoInstance> = new Map(),
    private options: Options = DEFAULT_OPTIONS,
    private createId: () => ClientId = defaultIdCreator,
  ) {}

  add(text: Text): TodoList {
    const clientId = this.createId();

    const todo: TodoInstance = {
      text,
      status: 'New',
      pubDate: new Date(),
    };

    this.collection.set(clientId, todo);
    this.options.mask.add(clientId);

    return new TodoList(this.collection, this.options, this.createId);
  }

  findByClientId(clientId: ClientId): TodoList {
    const options: Options = {
      ...this.options,
      mask: new Set([ clientId ]),
    };

    return new TodoList(this.collection, options, this.createId);
  }

  remove(): TodoList {
    this.options.mask.forEach((clientId: ClientId) => {
      this.collection.delete(clientId);
    });

    this.options.mask.clear();

    return new TodoList(this.collection, this.options, this.createId);
  }

  get length(): number {
    return this.options.mask.size;
  }

  [Symbol.iterator]() {
    const todoList: Todo[] = convertTodoMapToSortedArray(this.collection, this.options);

    return {
      index: 0,
      collection: this.collection,
      options: this.options,
      next(): IteratorResult<Todo> {
        return {
          done: false,
          value: {
            text: '13',
            id: '23',
            status: 'New',
          },
        };
      }
    };
  }
}

export {
  TodoList,
  TodoStatus,
  Text,
  ClientId,
};
