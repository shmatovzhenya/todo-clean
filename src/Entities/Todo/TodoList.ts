import { createId } from '../utils/createId';
import { TodoId, Text, Status, TodoListId, TodoDTO } from './types';
import { Todo } from './Todo';
import { SnapShot } from './SnapShot';

class TodoList {
  private _list: TodoId[] = [];
  private _record: Record<TodoId, Todo> = {};
  private _id: TodoListId;

  constructor(list: TodoDTO[] = []) {
    this._id = createId() as TodoListId;
    this._hydrate(list);
  }

  hydrate(list: TodoDTO[] = []): void {
    this._hydrate(list);
  }

  createSnapshot(): SnapShot {
    return new SnapShot(this.getList(), this);
  }

  get id(): TodoListId {
    return this._id;
  }

  add(text: Text): TodoDTO {
    const todo = new Todo(text);

    this._list.push(todo.id);
    this._record[todo.id] = todo;

    return {
      id: todo.id,
      status: todo.status,
      text: todo.text,
    };
  }

  removeByIds(ids: TodoId[]) {
    ids.forEach((id) => {
      delete this._record[id];
    });
  }

  updateStatus(id: TodoId, status: Status): void {
    if (!(id in this._record)) {
      return;
    }

    (this._record[id] as Todo).status = status;
  }

  edit(id: TodoId, text: Text): void {
    if (!(id in this._record)) {
      return;
    }

    if (text.length === 0) {
      this.removeByIds([id]);
      return;
    }

    (this._record[id] as Todo).text = text;
  }

  getList(status?: Status): TodoDTO[] {
    if (!status) {
      return this._list
        .filter((id) => id in this._record)
        .map((id) => this._convertTodoToDTOById(id));
    }

    return this._list
      .filter((id) => id in this._record && this._record[id].status === status)
      .map((id) => this._convertTodoToDTOById(id));
  }

  get length(): number {
    return Math.min(Object.keys(this._record).length, this._list.length);
  }

  private _convertTodoToDTOById(id: TodoId): TodoDTO {
    const todo = this._record[id] as Todo;

    return {
      id: todo.id,
      text: todo.text,
      status: todo.status,
    };
  }

  private _clear(): void {
    this._list = [];
    this._record = {};
  }

  private _hydrate(list: TodoDTO[]): void {
    this._clear();

    list.forEach((todoDTO) => {
      const todo = new Todo(todoDTO.text, todoDTO.id, todoDTO.status);

      this._list.push(todo.id);
      this._record[todo.id] = todo;
    });
  }
}

export { TodoList };
