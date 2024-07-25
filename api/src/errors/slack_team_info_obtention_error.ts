import { DefaultError } from "./default_error";

export class SlackTeamInfoObtentionError extends DefaultError {
  readonly status = 500;
  readonly message = 'Failed to obtain team info';
}