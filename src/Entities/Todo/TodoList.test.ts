import { TodoDTO, TodoId } from './types';
import { TodoList } from './TodoList';
import { TODO_LIST } from './fixtures';

describe('Testing TodoList', () => {
  test('Testing addition of todoList', () => {
    const todoList = new TodoList();

    todoList.add('12345');

    expect(todoList.getList()[0].status).toBe('New');
    expect(todoList.getList()[0].text).toBe('12345');
  });

  test('Testing edit one todo of todolist', () => {
    const todoList = new TodoList();

    todoList.add('12345');

    const id: TodoId = todoList.getList()[0].id;

    todoList.edit(id, '2343');

    expect(todoList.getList()[0].text).toBe('2343');
  });

  test('Initializing of empty todoList', () => {
    const todoList = new TodoList();

    expect(todoList.length).toBe(0);
    expect(todoList.getList()).toStrictEqual([]);
  });

  test('Testing hydratiation method of todoList', () => {
    const storedTodo: TodoDTO[] = JSON.parse(JSON.stringify(TODO_LIST));
    const todoList = new TodoList();

    todoList.hydrate(storedTodo);

    expect(todoList.length).toBe(3);
    expect(todoList.getList()).toStrictEqual(TODO_LIST);
  });

  test('Testing hydratiation method of todoList on initialization', () => {
    const storedTodo: TodoDTO[] = JSON.parse(JSON.stringify(TODO_LIST));
    const todoList = new TodoList(storedTodo);

    expect(todoList.length).toBe(3);
    expect(todoList.getList()).toStrictEqual(TODO_LIST);
  });

  test('Testing for removing todos from collection', () => {
    const storedTodo: TodoDTO[] = JSON.parse(JSON.stringify(TODO_LIST));
    const todoList = new TodoList(storedTodo);

    todoList.removeByIds(['2', '3']);

    expect(todoList.length).toBe(1);
    expect(todoList.getList()[0].text).toBe('qwert');
  });

  test('Testing for updating status by id', () => {
    const storedTodo: TodoDTO[] = JSON.parse(JSON.stringify(TODO_LIST));
    const todoList = new TodoList(storedTodo);

    todoList.updateStatus('3', 'Completed');

    expect(todoList.getList()[2].status).toBe('Completed');
  });

  test('Testing for updating status by invalid id (nothing changing)', () => {
    const storedTodo: TodoDTO[] = JSON.parse(JSON.stringify(TODO_LIST));
    const todoList = new TodoList(storedTodo);

    todoList.updateStatus('15', 'Completed');

    expect(todoList.getList()).toStrictEqual(TODO_LIST);
  });

  test('Testing updating text by invalid id (nothing changing)', () => {
    const storedTodo: TodoDTO[] = JSON.parse(JSON.stringify(TODO_LIST));
    const todoList = new TodoList(storedTodo);

    todoList.edit('15', 'Completed');

    expect(todoList.getList()).toStrictEqual(TODO_LIST);
  });

  test('Testing for updating to empty text (todo will be remove)', () => {
    const storedTodo: TodoDTO[] = JSON.parse(JSON.stringify(TODO_LIST));
    const todoList = new TodoList(storedTodo);

    todoList.edit('1', '');

    expect(todoList.getList()).toStrictEqual(TODO_LIST.slice(1));
  });

  test('Testing getting list by statuses', () => {
    const storedTodo: TodoDTO[] = JSON.parse(JSON.stringify(TODO_LIST));
    const todoList = new TodoList(storedTodo);

    expect(todoList.getList('Completed')).toStrictEqual([storedTodo[1]]);
    expect(todoList.getList('New').length).toBe(2);
    expect(todoList.getList('New')[1]).toStrictEqual(storedTodo[2]);
  });
});
