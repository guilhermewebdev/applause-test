import { RequestHandler } from "express";
import { SlackTeamMemberOutput } from "./entities";

export interface SlackTeamMemberController {
  list: RequestHandler<
    { slack_team_id: string },
    {
      slack_team_members: SlackTeamMemberOutput[],
      next_page_cursor?: string;
    },
    void,
    { page_cursor?: string }
  >
}