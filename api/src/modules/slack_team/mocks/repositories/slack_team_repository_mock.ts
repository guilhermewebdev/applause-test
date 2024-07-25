import { jest } from "@jest/globals";
import { SlackTeamRepository } from "../../@types/repositories/slack_team_repository";

export class SlackTeamRepositoryMock implements SlackTeamRepository {
  get = jest.fn<SlackTeamRepository['get']>()
  delete = jest.fn<SlackTeamRepository['delete']>()
  create = jest.fn<SlackTeamRepository['create']>()
  list = jest.fn<SlackTeamRepository['list']>()
}