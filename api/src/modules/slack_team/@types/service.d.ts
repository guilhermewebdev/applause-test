import { SlackTeam } from "./entities";

export interface SlackTeamService {
  create(payload: SlackTeam): Promise<SlackTeam>;
  list(): Promise<SlackTeam[]>;
  delete(id: string): Promise<void>;
}