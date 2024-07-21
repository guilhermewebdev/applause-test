export class SlackMessageCreationError {
  readonly code = 500;
  readonly message = 'Failed to send message';
  readonly caused_by: any;

  constructor(caused_by: any) {
    this.caused_by = caused_by;
  }
}