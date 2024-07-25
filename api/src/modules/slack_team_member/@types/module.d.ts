import { Router } from "express";
import { SlackTeamMemberController } from "./controller";
import { SlackTeamMemberService } from "./service";

export interface SlackTeamMemberModule {
  readonly service: SlackTeamMemberService;
  readonly controller: SlackTeamMemberController;

  get routes(): Router;
}