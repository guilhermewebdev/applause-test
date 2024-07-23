import { SlackTeamController } from "./controller";

export interface SlackTeamPolicy {
  create: SlackTeamController['create'];
  list: SlackTeamController['list'];
  delete: SlackTeamController['delete'];
  create_recognizement: SlackTeamController['create_recognizement'];
}