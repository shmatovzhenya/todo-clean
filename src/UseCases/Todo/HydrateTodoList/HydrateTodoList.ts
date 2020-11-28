import { Text, TodoDTO, TodoList, Status } from '../../../Entities/Todo';
import { UseCase, Storage, Logger, ErrorStatus, Notifier, ResponseFormat } from '../../types';


type HydrateTodoSession = {
  todoList: TodoList;
  loadTodoStorage: Storage<void, TodoDTO[]>;
  logger: Logger;
  notifier: Notifier<ErrorStatus | void, TodoDTO>;
};

class HydrateTodoList implements UseCase<void, TodoDTO[]> {
  constructor(private session: HydrateTodoSession) {}

  execute(): Promise<TodoDTO[]> {
    return new Promise((resolve, reject) => {
      this.session.logger.log('info', 'Starting hydrating todo list');

      this.session
        .loadTodoStorage
        .do()
        .then((response) => {
          if (response.errorCode) {
            const err = {
              code: response.errorCode,
              description: response.errorDescription,
            };

            this.session.logger.log('error', `Error with getting by reason ${JSON.stringify(err)}`);
            this.session.notifier.show('error', response.errorCode);
            reject(err);
            return;
          }

          this.session.todoList.hydrate(response.answer);
          this.session.logger.log('info', `success hydrating`);
          resolve(this.session.todoList.getList());
        })
    });
  }

  rollback(): void {}
}

export {
  HydrateTodoList,
};
