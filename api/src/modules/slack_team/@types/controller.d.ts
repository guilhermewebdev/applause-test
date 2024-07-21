import { SlackTeam } from "./entities";

export interface SlackTeamController {
  create(payload: SlackTeam): Promise<SlackTeam>;
  list(): Promise<SlackTeam[]>;
  delete(id: string): Promise<void>;
}