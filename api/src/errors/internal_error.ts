import { DefaultError } from "./default_error";

export class InternalError extends DefaultError {
  readonly code = 500;
  readonly message = 'Internal Error';
}