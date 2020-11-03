import { Todo } from './Todo';

describe('Testing Todo entity', () => {
  test('Testing creating todo', () => {
    const todo = new Todo('123456');

    expect(todo.id).toBeTruthy();
    expect(todo.text).toBe('123456');
    expect(todo.status).toBe('New');
  });

  test('Testing of updating todo', () => {
    const todo = new Todo('123456');
    const id = todo.id;

    expect(id).toBeTruthy();
    expect(todo.text).toBe('123456');
    expect(todo.status).toBe('New');

    todo.text = '4321';
    todo.status = 'Completed';

    expect(todo.id).toBe(id);
    expect(todo.status).toBe('Completed');
    expect(todo.text).toBe('4321');
  });

  test('Testing of creating todo with defined id and status', () => {
    const todo = new Todo('12345', '2', 'Completed');

    expect(todo.id).toBe('2');
    expect(todo.status).toBe('Completed');
    expect(todo.text).toBe('12345');
  });
});
