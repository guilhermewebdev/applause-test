export interface SlackTeamRepository {
  create(payload: SlackTeam): Promise<SlackTeam>;
  list(): Promise<SlackTeam[]>;
  delete(id: string): Promise<void>;
}