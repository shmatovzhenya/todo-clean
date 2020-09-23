import { TodoList, Text, TodoStatus, ClientId } from './TodoList';
import { Todo } from './types';
import { todoListFixture, sortedByDateArray } from './fixtures';

describe('Todo list testing', () => {
  test('123', () => {
    const todoList = new TodoList(todoListFixture, {
      mask: new Set(['3', '4', '9', '2']),
      sortType: 'ByAddition',
    });

    const result: Todo[] = [];

    for (let todo of todoList) {
      result.push(todo);
    }

    expect(result).toStrictEqual(sortedByDateArray);
  });
});
