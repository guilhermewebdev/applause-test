import { Db } from "mongodb";
import { RecognizementModule } from "../recognizement/@types";
import { SlackTeamController } from "./@types/controller";
import { SlackTeamModule } from "./@types/module";
import { SlackTeamService } from "./@types/service";
import { SlackTeamServiceImpl } from "./service";
import { SlackTeamControllerImpl } from "./controller";
import { Router } from 'express';
import { SlackTeamPolicyImpl } from "./policy";
import { SlackTeamPolicy } from "./@types/policy";
import { SlackTeamRepositoryImpl } from './repositories/slack_team_repository';
import { SlackTeam } from "./@types/entities";
import { SlackApiTeamRepositoryImpl } from "./repositories/slack_api_team_repository";

export class SlackTeamModuleImpl implements SlackTeamModule {
  readonly controller: SlackTeamController;
  readonly service: SlackTeamService;
  private readonly router: Router;
  private readonly policy: SlackTeamPolicy;

  constructor(
    recognizement_module: RecognizementModule,
    db: Db
  ) {
    const collection = db.collection<SlackTeam>('slack_teams')
    const slack_team_repository = new SlackTeamRepositoryImpl(collection);
    const slack_api_team_repository = new SlackApiTeamRepositoryImpl();
    this.service = new SlackTeamServiceImpl(
      recognizement_module.service,
      slack_team_repository,
      slack_api_team_repository
    )
    this.controller = new SlackTeamControllerImpl(this.service);
    this.router = Router();
    this.policy = new SlackTeamPolicyImpl()
  }

  get server() {
    return this.router
      .post(
        '/slack_teams/:slack_id/recognizement',
        this.policy.create_recognizement,
        this.controller.create_recognizement
      )
      .post(
        '/slack_teams',
        this.policy.create,
        this.controller.create,
      )
      .get(
        '/slack_teams',
        this.policy.list,
        this.controller.list
      )
      .delete(
        '/slack_teams/:slack_id',
        this.policy.delete,
        this.controller.delete
      )
  }
}