import { beforeEach, describe, jest, test, expect } from '@jest/globals';
import { SlackTeamMemberController } from './@types/controller';
import { SlackTeamMemberControllerImpl } from './controller';
import { SlackTeamMemberServiceMock } from './mocks/slack_team_member_service';
import { Request } from 'express';
import { SlackTeamMember } from './@types/entities';

describe('SlackTeamMemberController', () => {
  let controller: SlackTeamMemberController;
  let slack_team_member_service: SlackTeamMemberServiceMock;

  beforeEach(async () => {
    slack_team_member_service = new SlackTeamMemberServiceMock()
    controller = new SlackTeamMemberControllerImpl(slack_team_member_service)
  })

  describe('.list', () => {
    test('when success', async () => {
      const req: Partial<Request> = {
        params: {
          slack_team_id: '55'
        },
        query: {
          page_cursor: 'page 1'
        }
      }
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      }
      const next = jest.fn()
      const slack_team_members: SlackTeamMember[] = [{
          email: 'test@email.com',
          name: 'test name',
          slack_id: '123',
          avatar_url: 'http://test.com/image.png'
      }]
      const response_mock  = {
        slack_team_members,
        next_page_cursor: 'page 2'
      }
      slack_team_member_service.list.mockResolvedValueOnce(response_mock)
      // @ts-expect-error
      await controller.list(req, res, next);
      expect(next).not.toBeCalled()
      expect(res.json).toBeCalledWith(response_mock)
      expect(res.status).toBeCalledWith(200)
    })
  })
})