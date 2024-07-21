import { RequestHandler } from "express";
import { SlackTeam, SlackTeamInput, SlackTeamOutput } from "./entities";

export interface SlackTeamController {
  create: RequestHandler<{}, SlackTeamInput, SlackTeamOutput>;
  list: RequestHandler<{}, void, SlackTeamOutput[]>;
  delete: RequestHandler<{}, void, void>;
}