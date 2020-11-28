import { Text, TodoDTO, TodoList } from '../../../Entities/Todo';
import { UseCase, Storage, Logger, ErrorStatus, Notifier, ResponseFormat } from '../../types';


type CreateTodoSession = {
  todoList: TodoList;
  todoCreateStorage: Storage<TodoDTO, void>;
  logger: Logger;
  notifier: Notifier<ErrorStatus | void, TodoDTO>;
};

type CreateTodoOptions = {
  text: Text;
};

type Snapshot = ReturnType<typeof TodoList.prototype.createSnapshot>;

class CreateTodo implements UseCase<CreateTodoOptions, void> {
  private snapShot: Snapshot;

  constructor(private session: CreateTodoSession) {}

  execute({ text }: CreateTodoOptions): Promise<void> {
    this.snapShot = this.session.todoList.createSnapshot();
    this.session.logger.log('info', `Start creating new todo ${text.toString()}`);

    const todo: TodoDTO = this.session.todoList.add(text);

    return new Promise((resolve, reject) => {
      this.session
        .todoCreateStorage
        .do(todo)
        .then((response: ResponseFormat<void>) => {
          if (response.errorCode) {
            const err = {
              code: response.errorCode,
              description: response.errorDescription,
            };

            this.session.logger.log('error', `Error with creating new todo ${JSON.stringify(todo)} by reason ${JSON.stringify(err)}`);
            reject(err);
            return;
          }

          this.session.logger.log('info', `Successfully created new todo ${text.toString()}`);
          this.session.notifier.show('success', undefined, todo);
          resolve();
        })
    });
  }

  rollback(): void {
    this.session.logger.log('info', `Rollback of last creating todo`);
    this.snapShot.restore();
  }
}

export {
  CreateTodo,
  CreateTodoSession,
  CreateTodoOptions,
};
