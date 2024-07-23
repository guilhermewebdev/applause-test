import { Router } from "express";
import { SlackTeamController } from "./controller";
import { SlackTeamService } from "./service";

export interface SlackTeamModule {
  readonly service: SlackTeamService;
  readonly controller: SlackTeamController;

  get routes(): Router;
}