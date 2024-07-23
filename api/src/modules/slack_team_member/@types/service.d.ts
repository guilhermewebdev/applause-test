import { SlackTeamMember } from "./entities"

export interface SlackTeamMemberService {
  list(slack_team_id: string): Promise<{
    slack_team_members: SlackTeamMember[],
    next_page_cursor: string
  }>
}