import { RequestHandler } from "express";
import { SlackTeamInput, SlackTeamOutput } from "./entities";
import { RecognizementInput, RecognizementOutput } from "../../recognizement";

export interface SlackTeamController {
  create: RequestHandler<
    void,
    { slack_team: SlackTeamOutput },
    { slack_team: SlackTeamInput }
  >;
  list: RequestHandler<
    void,
    { slack_teams: SlackTeamOutput[] },
    void,
  >;
  delete: RequestHandler<{ slack_id: string }, void, void>;
  create_recognizement: RequestHandler<
    { slack_id: string },
    { recognizement: RecognizementOutput },
    { recognizement: RecognizementInput }
  >;
}