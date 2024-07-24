import { DefaultError } from "./default_error";

export class SlackMessageCreationError extends DefaultError {
  readonly code = 500;
  readonly message = 'Failed to send message';
}