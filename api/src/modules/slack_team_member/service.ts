import { SlackTeamMember } from "./@types/entities";
import { SlackApiTeamMemberRepository } from "./@types/repositories/slack_api_team_member_repository";
import { SlackTeamMemberService } from "./@types/service";

export class SlackTeamMemberServiceImpl implements SlackTeamMemberService {
  private readonly slack_api_team_member_repository: SlackApiTeamMemberRepository;

  constructor(slack_api_team_member_repository: SlackApiTeamMemberRepository) {
    this.slack_api_team_member_repository = slack_api_team_member_repository;
  }

  async list(slack_id: string): Promise<{ slack_team_members: SlackTeamMember[]; next_page_cursor: string; }> {
    return this.slack_api_team_member_repository.list(slack_id);    
  }
}