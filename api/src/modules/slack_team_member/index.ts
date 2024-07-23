import { Router } from "express";
import { SlackTeamMemberController } from "./@types/controller";
import { SlackTeamMemberService } from "./@types/service";
import { SlackTeamMemberPolicy } from "./@types/policy";
import { SlackTeamMemberControllerImpl } from "./controller";
import { SlackTeamMemberServiceImpl } from "./service";
import { SlackApiTeamMemberRepositoryImpl } from "./repositories/slack_api_team_member_repository";
import { SlackTeamModule } from "../slack_team/@types/module";
import { SlackTeamMemberPolicyImpl } from "./policy";
import { SlackTeamMemberModule } from './@types/module';

export class SlackTeamMemberModuleImpl implements SlackTeamMemberModule {
  readonly controller: SlackTeamMemberController;
  readonly service: SlackTeamMemberService;
  private readonly router: Router;
  private readonly policy: SlackTeamMemberPolicy;

  constructor(slack_teams: SlackTeamModule) {
    const slack_api_team_member_repository = new SlackApiTeamMemberRepositoryImpl();
    this.service = new SlackTeamMemberServiceImpl(
      slack_api_team_member_repository,
      slack_teams.service
    )
    this.controller = new SlackTeamMemberControllerImpl(this.service)
    this.policy = new SlackTeamMemberPolicyImpl()
    this.router = Router()
  }

  get routes() {
    return this.router
      .get(
        '/slack_teams/:slack_team_id/members',
        this.policy.list,
        this.controller.list
      )
  }
}