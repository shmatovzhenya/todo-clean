import { ClientId, Options, Todo, TodoInstance } from './types';
import { TodoList } from './TodoList';

class TodoBuilder {
  create(): TodoList {
    return new TodoList();
  }

  hydrate(todoList: Todo[]): TodoList {
    const collection: Map<ClientId, TodoInstance> = new Map();
    let counter = 0;

    const options: Options = {
      mask: new Set([]),
      sortType: 'ByAddition',
    };

    for (let todo of todoList) {
      const { id, text, status }: Todo = todo;
      const instance: TodoInstance = {
        text, status,
        orderId: counter,
      };

      counter += 100;
      collection.set(id, instance);
      options.mask.add(id);
    }

    return new TodoList(collection, options);
  }
}

export {
  TodoBuilder,
};
