import { RequestHandler } from "express";
import { SlackTeamMemberOutput } from "./entities";

export interface SlackTeamMemberController {
  list: RequestHandler<
    { slack_team_id: string },
    void,
    {
      slack_team_members: SlackTeamMemberOutput[],
      next_page_cursor: string;
    },
    { page_cursor?: string }
  >
}