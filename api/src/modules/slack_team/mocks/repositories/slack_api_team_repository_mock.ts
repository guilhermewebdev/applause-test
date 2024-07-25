import { jest } from "@jest/globals";
import { SlackApiTeamRepository } from "../../@types/repositories/slack_api_team_repository";

export class SlackApiTeamRepositoryMock implements SlackApiTeamRepository {
  get = jest.fn<SlackApiTeamRepository['get']>()
}