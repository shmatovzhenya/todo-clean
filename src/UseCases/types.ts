type ErrorStatus = 'NetworkError' | 'BadArguments' | 'BadGateway' | 'ServerError' | 'Forbidden' | 'NotFound';

interface ResponseFormat<T> {
  errorCode?: ErrorStatus;
  errorDescription?: string;
  answer: T | undefined;
}

type LogLevel = 'info' | 'warning' | 'error' | 'panic';
type ErrorLevel = 'info' | 'success' | 'error' | 'warning';

interface Logger {
  log(level: LogLevel, message: string): void;
}

interface UseCase<Options, Result> {
  rollback(): void;
  execute(options: Options): Promise<Result>;
}

interface Notifier<T, Options> {
  show(level: ErrorLevel, description: T, data?: Options): void;
}

interface Storage<Options, Result> {
  do(options: Options): Promise<ResponseFormat<Result>>;
}

export {
  ResponseFormat,
  UseCase,
  Storage,
  Logger,
  LogLevel,
  ErrorStatus,
  Notifier,
};
