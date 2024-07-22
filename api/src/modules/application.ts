import { Db, MongoClient } from "mongodb";
import { RecognizementModule } from "./recognizement/@types";
import { RecognizementModuleImpl } from "./recognizement";
import { SlackTeamModuleImpl } from "./slack_team";
import { SlackTeamModule } from "./slack_team/@types/module";
import { Express, json, Router, urlencoded } from 'express';
import morgan from "morgan";
import helmet from 'helmet';
import { Settings } from "../@types/settings";
import express from 'express';

export class Application {
  private readonly slack_team: SlackTeamModule;
  private readonly recognizement: RecognizementModule;
  private readonly db: Db;
  private readonly db_client: MongoClient;
  private readonly router: Router;
  private readonly server: Express;
  private readonly settings: Settings;

  constructor(settings: Settings) {
    this.settings = settings;
    this.db_client = new MongoClient(
      this.settings.db.client.url,
      this.settings.db.client.options
    )
    this.db = this.db_client.db(
      this.settings.db.name,
      this.settings.db.options,
    );
    this.server = express();
    this.router = Router();
    this.recognizement = new RecognizementModuleImpl(this.db)
    this.slack_team = new SlackTeamModuleImpl(
      this.recognizement,
      this.router,
      this.db
    )
  }
  
  public async start() {
    await this.setup()
    await this.listen()
  }
  
  private async listen() {
    this.server.listen(
      this.settings.server.port,
      this.settings.server.host,
      () => {
        console.log(`Server running on ${this.settings.server.host}:${this.settings.server.port}`)
      }
    )
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