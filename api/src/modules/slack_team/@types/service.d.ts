import { SlackTeam, SlackTeamInput } from "./entities";

export interface SlackTeamService {
  create(payload: SlackTeamInput): Promise<SlackTeam>;
  list(): Promise<SlackTeam[]>;
  delete(id: string): Promise<void>;
}