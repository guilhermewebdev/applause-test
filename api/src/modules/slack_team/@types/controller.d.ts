import { RequestHandler } from "express";
import { SlackTeamInput, SlackTeamOutput } from "./entities";
import { RecognizementInput, RecognizementOutput } from "../../recognizement";

export interface SlackTeamController {
  create: RequestHandler<
    void,
    { slack_team: SlackTeamInput },
    { slack_team: SlackTeamOutput }
  >;
  list: RequestHandler<
    void,
    void,
    { slack_teams: SlackTeamOutput[] }
  >;
  delete: RequestHandler<{ slack_id: string }, void, void>;
  create_recognizement: RequestHandler<
    { slack_id: string },
    { recognizement: RecognizementOutput },
    { recognizement: RecognizementInput }
  >;
}