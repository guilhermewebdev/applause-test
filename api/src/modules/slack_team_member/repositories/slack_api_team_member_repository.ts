import { WebClient } from "@slack/web-api";
import { SlackTeamService } from "../../slack_team/@types/service";
import { SlackTeamMember, SlackTeamMemberListInput } from "../@types/entities";
import { SlackApiTeamMemberRepository } from "../@types/repositories/slack_api_team_member_repository";
import { SlackTeamMembersObtetionError } from "../../../errors/slack_team_members_obtetion_error";

export class SlackApiTeamMemberRepositoryImpl implements SlackApiTeamMemberRepository {
  private readonly slack_teams: SlackTeamService;

  constructor(slack_teams: SlackTeamService) {
    this.slack_teams = slack_teams;
  }

  async list(payload: SlackTeamMemberListInput): Promise<{ slack_team_members: SlackTeamMember[]; next_page_cursor?: string; }> {
    const { slack_team_id, page_cursor } = payload;
    const slack_team = await this.slack_teams.get(slack_team_id);
    const client = new WebClient(slack_team.integration_key);
    const users = await client.users.list({
      limit: 100,
      team_id: slack_team_id,
      cursor: page_cursor
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