import { DefaultError } from "./default_error";

export class SlackTeamMembersObtetionError extends DefaultError {
  readonly status = 500;
  readonly message = 'Failed to obtain slack team members data';
}