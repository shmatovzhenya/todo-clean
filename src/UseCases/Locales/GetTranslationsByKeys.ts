import type { UseCase, Storage, Logger, ResponseFormat } from '../types';

interface LocalesCache {
  hasKey(key: string): boolean;
  getByKey(key: string): string;
  setByKey(key: string, value: string): void;
}

type Locales = {
  [index: string]: string;
};

type GetTranslationsSession = {
  storage: Storage<string[], Locales>;
  logger: Logger;
  cache: LocalesCache;
};

class GetTranslationsByKey implements UseCase<string[], Locales> {
  constructor(private session: GetTranslationsSession) {}

  execute(keys: string[]): Promise<Locales> {
    const keysForRequest = keys.filter(key => this.session.cache.hasKey(key));

    return new Promise((resolve, reject) => {
      this.session.storage
        .do(keysForRequest)
        .then((response: ResponseFormat<Locales>) => {
          const locales = response.answer;

          if (!locales) {
            return;
          }

          Object.keys(locales).forEach((key) => {
            const value: string = locales[key];

            this.session.cache.setByKey(key, value);
          });

          const result: Locales = keys.reduce((result, key) => {
            if (this.session.cache.hasKey(key)) {
              result[key] = this.session.cache.getByKey(key);
            } else {
              result[key] = key;
            }

            return result;
          }, {} as Locales);

          resolve(result);
        })
        .catch(error => {
          this.session.logger.log('error', JSON.stringify(error));
        });
    });
  }

  rollback(): void {}
}

export {
  GetTranslationsByKey,
  Locales,
};
