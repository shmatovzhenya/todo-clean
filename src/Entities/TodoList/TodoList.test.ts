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

  test('Test for getting single element of todo by id', () => {
    const todoList = new TodoList(todoListFixture, {
      mask: new Set(['3', '4', '2']),
      sortType: 'ByAddition',
    });

    const todos = todoList.findByClientId('3');
    let todo: Todo;

    for (let t of todos) {
      todo = t;
    }

    expect(todos.length).toBe(1);
    expect(todo.text).toBe('qwerty');
  });

  test('Testing addition of todo', () => {
    const todoList = new TodoList();
    const result: Todo[] = [];

    todoList.add('67890').add('knkn');

    for (let todo of todoList) {
      result.push(todo);
    }

    expect(todoList.length).toBe(2);
    expect(result[0].text).toBe('67890');
    expect(result[1].text).toBe('knkn');
  });

  test('Testing removing todo', () => {
    const todoList = new TodoList();
    const result: Todo[] = [];

    todoList.add('67890').add('knkn');

    for (let todo of todoList) {
      result.push(todo);
    }

    const id: ClientId = result[1].id;
    const result1: Todo[] = [];

    todoList.findByClientId(id).remove();

    for (let todo of todoList) {
      result1.push(todo);
    }

    expect(todoList.length).toBe(1);
    expect(result1[0].text).toBe('67890');
  });
});
