import { jest } from '@jest/globals';
import { SlackTeamMemberService } from '../@types/service'

export class SlackTeamMemberServiceMock implements SlackTeamMemberService {
  list = jest.fn<SlackTeamMemberService['list']>()
}