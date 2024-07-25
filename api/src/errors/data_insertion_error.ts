import { DefaultError } from "./default_error";

export class DataInsertionError extends DefaultError {
  readonly code = 500;
  readonly message = 'Failed to save data in database';
}