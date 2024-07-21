import { SlackTeamMember } from "../entities";

export interface SlackApiTeamMemberRepository {
  list(slack_id: string): Promise<{
    slack_team_members: SlackTeamMember[],
    next_page_cursor: string
  }>;
}