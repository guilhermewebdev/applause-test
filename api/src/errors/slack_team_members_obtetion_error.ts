export class SlackTeamMembersObtetionError {
  readonly status = 500;
  readonly message = 'Failed to obtain slack team members data';
  readonly caused_by?: string;

  constructor(caused_by?: string) {
    this.caused_by = caused_by;
  }
}