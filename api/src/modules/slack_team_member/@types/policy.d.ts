import { RequestHandler } from "express";
import { SlackTeamMemberController } from "./controller";

export interface SlackTeamMemberPolicy {
  list: SlackTeamMemberController['list'];
}