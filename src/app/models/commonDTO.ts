export interface ResponseWithError<T> {
  response?: T;
  message?: string;
  success?: boolean;
}