import { WebClient } from "@slack/web-api";
import { SlackApiTeamRepository } from "../@types/repositories/slack_api_team_repository";
import { SlackTeam } from "../@types/entities";
import { SlackTeamInfoObtentionError } from "../../../errors/slack_team_info_obtention_error";

export class SlackApiTeamRepositoryImpl implements SlackApiTeamRepository {
  async get(integration_key: string): Promise<SlackTeam> {
    try {      
      const client = new WebClient(integration_key);
      const data = await client.auth.test();
      if(data.error || !data.ok || !data.team) throw new SlackTeamInfoObtentionError(data.error);
      return {
        integration_key,
        name: data.team as string,
        slack_id: data.team_id as string,
      }
    } catch (error: any) {
      throw new SlackTeamInfoObtentionError(error) 
    }
  }
}