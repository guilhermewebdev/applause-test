import { SlackTeamMember } from "./entities"

export interface SlackTeamMemberService {
  list(slack_id: string): Promise<{
    slack_team_members: SlackTeamMember[],
    next_page_cursor: string
  }>
}