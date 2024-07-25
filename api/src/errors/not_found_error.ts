import { DefaultError } from "./default_error"

export class NotFoundError extends DefaultError {
  readonly code = 404
  readonly message = 'Not found'
}