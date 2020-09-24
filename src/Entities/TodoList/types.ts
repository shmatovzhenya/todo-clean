type TodoStatus = 'New' | 'Completed';
type ClientId = string;
type Text = string;
type SortType = 'ByAddition' | 'Default';
type OrderId = number;

type Todo = {
  id: ClientId;
  text: Text;
  status: TodoStatus;
}

type ComparasionResult = -1 | 0 | 1;
type TodoInstance = {
  text: Text;
  status: TodoStatus;
  orderId: OrderId;
};

type Options = {
  mask: Set<ClientId>;
  sortType: SortType;
};

type CompareFunction<T> = (left: T, right: T) => ComparasionResult;

export {
  TodoStatus,
  ClientId,
  Text,
  SortType,
  Todo,
  ComparasionResult,
  TodoInstance,
  Options,
  CompareFunction,
  OrderId,
};
