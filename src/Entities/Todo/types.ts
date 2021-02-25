// import type { Flavor } from '../../types';

type TodoId = string;
type Text = string;
type Status = 'New' | 'Completed';
type TodoListId = string;

type TodoDTO = {
  id: TodoId;
  text: Text;
  status: Status;
};

export { TodoId, Text, Status, TodoListId, TodoDTO };
