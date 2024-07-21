import { RequestHandler } from "express";
import { SlackTeam, SlackTeamInput, SlackTeamOutput } from "./entities";

export interface SlackTeamController {
  create: RequestHandler<
    void,
    { slack_team: SlackTeamInput },
    { slack_team: SlackTeamOutput }
  >;
  list: RequestHandler<
    {},
    void,
    { slack_teams: SlackTeamOutput[] }
  >;
  delete: RequestHandler<{}, void, void>;
}