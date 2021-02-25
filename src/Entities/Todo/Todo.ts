import type { TodoId, Text, Status } from './types';
import { createId } from '../utils/createId';

class Todo {
  private _id: TodoId;
  private _status: Status;
  private _text: Text;

  constructor(
    text: Text,
    id: TodoId = createId() as TodoId,
    status: Status = 'New',
  ) {
    this._text = text;
    this._id = id;
    this._status = status;
  }

  get text(): Text {
    return this._text;
  }

  get id(): TodoId {
    return this._id;
  }

  get status(): Status {
    return this._status;
  }

  set status(status: Status) {
    this._status = status;
  }

  set text(text: Text) {
    this._text = text;
  }
}

export { Todo };
