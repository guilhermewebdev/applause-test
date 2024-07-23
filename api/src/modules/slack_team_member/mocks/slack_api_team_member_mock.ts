import { jest } from "@jest/globals";
import { SlackApiTeamMemberRepository } from "../@types/repositories/slack_api_team_member_repository";

export class SlackApiTeamMemberRepositoryMock implements SlackApiTeamMemberRepository {
  list = jest.fn<SlackApiTeamMemberRepository['list']>();
} 