import { WebClient } from "@slack/web-api";
import { SlackTeamMember } from "../@types/entities";
import { SlackApiTeamMemberRepository } from "../@types/repositories/slack_api_team_member_repository";
import { SlackTeamMembersObtetionError } from "../../../errors/slack_team_members_obtetion_error";
import { SlackTeam } from "../../slack_team/@types/entities";

export class SlackApiTeamMemberRepositoryImpl implements SlackApiTeamMemberRepository {

  async list(slack_team: SlackTeam, page_cursor?: string): Promise<{ slack_team_members: SlackTeamMember[]; next_page_cursor?: string; }> {
    const client = new WebClient(slack_team.integration_key);
    const users = await client.users.list({
      limit: 100,
      cursor: page_cursor,
      team_id: slack_team.slack_id
    });
    if(users.error || !users.ok || !users.members) throw new SlackTeamMembersObtetionError(users.error);
    const slack_team_members_promises= users.members.map(async (member) => ({
      email: member.profile?.email,
      name: member.name,
      slack_id: member.id,
      avatar_url: member.profile?.image_48
    }) as SlackTeamMember)
    const slack_team_members = await Promise.all(slack_team_members_promises)
    return {
      slack_team_members,
      next_page_cursor: users.response_metadata?.next_cursor
    }
  }
}