import type { Text, TodoDTO, TodoList, Status } from '../../../Entities/Todo';
import type { UseCase, Storage, Logger, ErrorStatus, Notifier, ResponseFormat } from '../../types';


type GetTodoSession = {
  todoList: TodoList;
  // loadTodoStorage: Storage<{ status?: Status }, TodoDTO[]>;
  logger: Logger;
  // notifier: Notifier<ErrorStatus | void, TodoDTO>;
};


type GetTodoOptions = {
  status?: Status;
};

class GetTodoListByStatus implements UseCase<GetTodoOptions, TodoDTO[]> {
  constructor(private session: GetTodoSession) {}

  execute({ status }: GetTodoOptions): Promise<TodoDTO[]> {
    this.session.logger.log('info', `Getting todolist by status ${status}`);

    return new Promise((resolve) => {
      const result: TodoDTO[] =  this.session.todoList.getList(status);

      this.session.logger.log('info', `Get todo by status ${status}`);
      resolve(result);
    });
  }

  rollback(): void {}
}

export {
  GetTodoListByStatus,
};
