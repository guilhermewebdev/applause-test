import { jest } from "@jest/globals";
import { SlackTeamService } from "../@types/service";

export class SlackTeamServiceMock implements SlackTeamService {
  create = jest.fn<SlackTeamService['create']>();
  create_recognizement = jest.fn<SlackTeamService['create_recognizement']>();
  delete = jest.fn<SlackTeamService['delete']>();
  list = jest.fn<SlackTeamService['list']>();
  get = jest.fn<SlackTeamService['get']>();
}