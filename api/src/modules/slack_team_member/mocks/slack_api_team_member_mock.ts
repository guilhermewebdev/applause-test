import { jest } from "@jest/globals";
import { SlackTeamMemberService } from "../@types/service";

export class SlackApiTeamMemberRepositoryMock implements SlackTeamMemberService {
  list = jest.fn<SlackTeamMemberService['list']>();
} 