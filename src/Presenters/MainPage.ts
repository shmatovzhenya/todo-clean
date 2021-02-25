import { HydrateTodoList } from '../UseCases/Todo/HydrateTodoList';
import { GetTranslationsByKey, Locales } from '../UseCases/Locales';
import { TodoDTO } from '../Entities/Todo';

interface MainPageSession {
  hydrateTodoList: HydrateTodoList;
  getTranslationsByKey: GetTranslationsByKey;
}

type Result = {
  todoList: TodoDTO[];
  locales: Locales;
};

const KEYS = [
  'MAIN_PAGE.LOGO',
  'MAIN_PAGE.TEXTAREA_PLACEHOLDER',
  'MAIN_PAGE.ELEMENTS_LEFT',
  'MAIN_PAGE.NOT_TODOS',
];

class Page {
  constructor(private session: MainPageSession) {}

  load(): Promise<Result> {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.session.hydrateTodoList.execute(),
        this.session.getTranslationsByKey.execute(KEYS),
      ]).then(([ todoList, locales ]: [TodoDTO[], Locales]) => {
        resolve({
          todoList,
          locales,
        });
      });
    });
  }
}

export {
  Page,
};
