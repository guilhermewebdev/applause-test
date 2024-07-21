import { RequestHandler } from "express";

export interface SlackTeamPolicy {
  create: RequestHandler;
  list: RequestHandler;
}