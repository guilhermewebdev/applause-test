import { SlackTeam } from "../../../slack_team/@types/entities";
import { SlackTeamMember, SlackTeamMemberListInput } from "../entities";

export interface SlackApiTeamMemberRepository {
  list(slack_team: SlackTeam, page_cursor?: string): Promise<{
    slack_team_members: SlackTeamMember[],
    next_page_cursor?: string
  }>;
}