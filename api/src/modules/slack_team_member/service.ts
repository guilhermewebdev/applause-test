import { SlackTeamService } from "../slack_team/@types/service";
import { SlackTeamMember, SlackTeamMemberListInput } from "./@types/entities";
import { SlackApiTeamMemberRepository } from "./@types/repositories/slack_api_team_member_repository";
import { SlackTeamMemberService } from "./@types/service";

export class SlackTeamMemberServiceImpl implements SlackTeamMemberService {
  private readonly slack_api_team_member_repository: SlackApiTeamMemberRepository;
  private readonly slack_teams: SlackTeamService;

  constructor(
    slack_api_team_member_repository: SlackApiTeamMemberRepository,
    slack_teams: SlackTeamService,
  ) {
    this.slack_teams = slack_teams;
    this.slack_api_team_member_repository = slack_api_team_member_repository;
  }

  async list(payload: SlackTeamMemberListInput): Promise<{ slack_team_members: SlackTeamMember[]; next_page_cursor?: string; }> {
    const { slack_team_id, page_cursor } = payload;
    const slack_team = await this.slack_teams.get(slack_team_id);
    return this.slack_api_team_member_repository.list(slack_team, page_cursor);
  }
}