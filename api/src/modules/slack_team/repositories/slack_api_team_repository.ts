import { WebClient } from "@slack/web-api";
import { SlackApiTeamRepository } from "../@types/repositories/slack_api_team_repository";
import { SlackTeam } from "../@types/entities";
import { SlackTeamInfoObtentionError } from "../../../errors/slack_team_info_obtention_error";
import { randomUUID } from "crypto";

export class SlackApiTeamRepositoryImpl implements SlackApiTeamRepository {
  async get(integration_key: string): Promise<SlackTeam> {
    try {      
      const client = new WebClient(integration_key);
      const data = await client.team.info();
      if(data.error || !data.ok || !data.team) throw new SlackTeamInfoObtentionError(data.error);
      return {
        integration_key,
        name: data.team?.name as string,
        slack_id: data.team?.id as string,
      }
    } catch (error: any) {
      if (error.data) {
        return {
          integration_key,
          name: randomUUID(),
          slack_id: randomUUID()
        }
      }
      throw new SlackTeamInfoObtentionError(error) 
    }
  }
}