import { beforeEach, describe, test, jest, expect } from '@jest/globals';
import { SlackTeamController } from './@types/controller';
import { SlackTeamControllerImpl } from './controller';
import { SlackTeamServiceMock } from './mocks/slack_team_service_mock';
import { Request } from 'express';

describe('SlackTeamController', () => {
  let controller: SlackTeamController;
  let slack_teams_service: SlackTeamServiceMock;

  beforeEach(async () => {
    slack_teams_service = new SlackTeamServiceMock()
    controller = new SlackTeamControllerImpl(slack_teams_service)
  })

  describe('.create_recognizement', () => {
    test('when success', async () => {
      const req: Partial<Request> = {
        params: { slack_id: '55' },
        body: {
          recognizement: {
            slack_team_id: '44',
            message: 'test message',
            slack_team_member_id: '55'
          }
        }
      }
      const statusMock = jest.fn().mockReturnThis();
      const jsonMock = jest.fn();
      const res = {
        status: statusMock,
        json: jsonMock,
      }
      slack_teams_service.create_recognizement.mockResolvedValue({
        slack_team_member_id: '55',
        message: 'test message'
      })
      // @ts-expect-error
      await controller.create_recognizement(req, res, () => {});
      expect(statusMock).toBeCalledWith(201)
      expect(jsonMock).toBeCalledWith({
        recognizement: {
          message: 'test message',
          slack_team_member_id: '55'
        }
      })
    })
  })

  describe('.create', () => {
    test('when success', async () => {
      const req: Partial<Request> = {
        body: {
          slack_team: {
            integration_key: 'integration key'
          }
        }
      };
      const statusMock = jest.fn().mockReturnThis();
      const jsonMock = jest.fn();
      const res = {
        status: statusMock,
        json: jsonMock,
      }
      slack_teams_service.create.mockResolvedValueOnce({
        integration_key: req.body.integration_key,
        name: 'test',
        slack_id: '55'
      })
      // @ts-expect-error
      await controller.create(req, res, () => {})
      expect(statusMock).toBeCalledWith(201)
      expect(jsonMock).toBeCalledWith({
        slack_team: {
          name: 'test',
          slack_id: '55'
        }
      })
    })
  })

  describe('.list', () => {
    test('when success', async () => {
      const req = {}
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      slack_teams_service.list.mockResolvedValueOnce([{
        integration_key: 'integration key',
        name: 'test',
        slack_id: '55'
      }])
      // @ts-expect-error
      await controller.list(req, res, () => {})
      expect(res.status).toBeCalledWith(200)
      expect(res.json).toBeCalledWith({
        slack_teams: [{
          name: 'test',
          slack_id: '55'
        }]
      })
    })
  })

})