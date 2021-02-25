import type { TodoDTO } from './types';
import type { TodoList } from './TodoList';

class SnapShot {
  private _list: TodoDTO[] = [];
  private _todoList: TodoList;

  constructor(list: TodoDTO[], todoList: TodoList) {
    this._list = list;
    this._todoList = todoList;
  }

  restore(): void {
    this._todoList.hydrate(this._list);
  }
}

export { SnapShot };
