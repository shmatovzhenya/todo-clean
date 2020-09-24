import { TodoList, Text, TodoStatus, ClientId } from './TodoList';
import { Todo } from './types';
import { todoListFixture, sortedByDateArray, sortedByDefaultArray } from './fixtures';

describe('Todo list testing', () => {
  test('Testing sorting todo by publication date', () => {
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

  test('Testing sorting by default (random)', () => {
    const todoList = new TodoList(todoListFixture, {
      mask: new Set(['3', '4', '9', '2']),
      sortType: 'Default',
    });

    const result: Todo[] = [];

    for (let todo of todoList) {
      result.push(todo);
    }

    expect(result).toStrictEqual(sortedByDefaultArray);
  });

  test('Testing getting length of todo', () => {
    const todoList = new TodoList(todoListFixture, {
      mask: new Set(['3', '4', '2']),
      sortType: 'ByAddition',
    });

    expect(todoList.length).toBe(3);
  });
});
