import { SlackTeam } from '../entities';

export interface SlackApiTeamRepository {
  get(integration_key: string): Promise<SlackTeam>;
}