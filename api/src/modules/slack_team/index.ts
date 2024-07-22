import { Db } from "mongodb";
import { RecognizementModule, RecognizementModuleImpl } from "../recognizement";
import { SlackTeamController } from "./@types/controller";
import { SlackTeamModule } from "./@types/module";
import { SlackTeamService } from "./@types/service";
import { SlackTeamServiceImpl } from "./service";
import { SlackTeamControllerImpl } from "./controller";
import { Express } from 'express';
import { SlackTeamPolicyImpl } from "./policy";
import { SlackTeamPolicy } from "./@types/policy";

export class SlackTeamModuleImpl implements SlackTeamModule {
  readonly controller: SlackTeamController;
  readonly service: SlackTeamService;
  private readonly router: Express;
  private readonly policy: SlackTeamPolicy;

  constructor(
    recognizement_module: RecognizementModule,
    router: Express
  ) {
    this.service = new SlackTeamServiceImpl(
      recognizement_module.service,
      {},
    )
    this.controller = new SlackTeamControllerImpl(this.service);
    this.router = router;
    this.policy = new SlackTeamPolicyImpl()
  }

  get server() {
    return this.router
      .post(
        '/slack_team/:slack_id/recognizement',
        this.policy.create_recognizement,
        this.controller.create_recognizement
      )
  }
}