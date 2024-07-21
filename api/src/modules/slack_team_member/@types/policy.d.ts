import { RequestHandler } from "express";

export interface SlackTeamMemberPolicy {
  list: RequestHandler;
}