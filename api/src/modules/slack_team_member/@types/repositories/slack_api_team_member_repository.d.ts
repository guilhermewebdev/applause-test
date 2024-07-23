import { SlackTeamMember, SlackTeamMemberListInput } from "../entities";

export interface SlackApiTeamMemberRepository {
  list(payload: SlackTeamMemberListInput): Promise<{
    slack_team_members: SlackTeamMember[],
    next_page_cursor?: string
  }>;
}