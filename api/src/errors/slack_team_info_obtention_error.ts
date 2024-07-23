export class SlackTeamInfoObtentionError {
  readonly status = 500;
  readonly message = 'Failed to obtain team info';
  readonly caused_by?: string;

  constructor(caused_by?: string) {
    this.caused_by = caused_by;
  }
}