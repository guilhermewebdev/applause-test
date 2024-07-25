import { DefaultError } from "./default_error";

export class DuplicatedEntryError extends DefaultError {
  readonly message: string = 'Item already exists';
  readonly code: number = 400;
}