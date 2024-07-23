export class SlackMessageCreationError {
  readonly code = 500;
  readonly message = 'Failed to send message';
  readonly caused_by: string;

  constructor(caused_by: string) {
    this.caused_by = caused_by;
  }
}