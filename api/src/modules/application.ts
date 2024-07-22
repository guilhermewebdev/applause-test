import { Db } from "mongodb";
import { RecognizementModule, RecognizementModuleImpl } from "./recognizement";
import { SlackTeamModuleImpl } from "./slack_team";
import { SlackTeamModule } from "./slack_team/@types/module";
import { Express, json, Router, urlencoded } from 'express';
import morgan from "morgan";
import helmet from 'helmet';

export class Application {
  private readonly slack_team: SlackTeamModule;
  private readonly recognizement: RecognizementModule;
  private readonly db: Db;
  private readonly router: Router;
  private readonly server: Express;

  constructor(
    db: Db,
    server: Express
  ) {
    this.db = db;
    this.server = server;
    this.router = Router();
    this.recognizement = new RecognizementModuleImpl(db)
    this.slack_team = new SlackTeamModuleImpl(
      this.recognizement,
      this.router,
      this.db
    )
  }
  
  public async start() {
    await this.setup()
    this.server.listen()
  }

  private async setup() {
    await this.setup_middlewares()
    await this.setup_modules();
    this.server.use('/api', this.router);
  }

  private get middlewares() {
    return [
      json(),
      urlencoded(),
      morgan("combined"),
      helmet(),
    ]
  }

  private async setup_middlewares() {
    this.server.use(...this.middlewares);
  }

  private async setup_modules() {
    this.router
      .use(this.slack_team.server)
  }
}