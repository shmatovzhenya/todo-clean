import { Flavor } from '../../types';

type TodoId = Flavor<string, 'TodoId'>;
type Text = string;
type Status = 'New' | 'Completed';
type TodoListId = Flavor<string, 'TodoListId'>;

type TodoDTO = {
  id: TodoId;
  text: Text;
  status: Status;
};

export { TodoId, Text, Status, TodoListId, TodoDTO };
