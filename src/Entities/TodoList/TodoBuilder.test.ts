import { Todo } from './types';
import { sortedByDateArray } from './fixtures';
import { TodoList } from './TodoList';
import { TodoBuilder } from './TodoBuilder';

describe('Testing todo Builder', () => {
  test('Testing creating new TodoList', () => {
    const builder = new TodoBuilder();
    const todoList = builder.create();

    expect(todoList).toBeInstanceOf(TodoList);
    expect(todoList.length).toBe(0);
  });

  test('Testing todoList hydratation', () => {
    const builder = new TodoBuilder();
    const todoList = builder.hydrate(sortedByDateArray);
    const result: Todo[] = [];

    for (let todo of todoList) {
      result.push(todo);
    }

    expect(sortedByDateArray).not.toBe(result);
    expect(sortedByDateArray).toStrictEqual(result);
  });
});
