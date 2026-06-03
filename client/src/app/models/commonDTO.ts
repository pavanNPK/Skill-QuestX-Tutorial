// use of this file is:
// Angular source file. It connects one part of the frontend application.
export interface ResponseWithError<T> {
  response?: T;
  message?: string;
  success?: boolean;
}