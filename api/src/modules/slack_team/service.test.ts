import { beforeEach, describe, expect, test } from '@jest/globals';
import { SlackTeamService } from './@types/service';
import { SlackTeamServiceImpl } from './service';
import { RecognizementServiceMock } from '../recognizement/mocks/service';
import { SlackTeamRepositoryMock } from './mocks/repositories/slack_team_repository_mock';
import { SlackApiTeamRepository } from './@types/repositories/slack_api_team_repository';
import { SlackApiTeamRepositoryMock } from './mocks/repositories/slack_api_team_repository_mock';
import { SlackTeam } from './@types/entities';

describe('SlackTeamService', () => {
  let service: SlackTeamService;
  let recognizements: RecognizementServiceMock;
  let slack_team_repository: SlackTeamRepositoryMock;
  let slack_api_team_repository: SlackApiTeamRepositoryMock;

  beforeEach(async () => {
    recognizements = new RecognizementServiceMock()
    slack_team_repository = new SlackTeamRepositoryMock()
    slack_api_team_repository = new SlackApiTeamRepositoryMock()
    service = new SlackTeamServiceImpl(
      recognizements,
      slack_team_repository,
      slack_api_team_repository
    )
  })

  describe('.create_recognizement', () => {

    test('when success', async () => {
      const input = {
        message: 'test message',
        slack_team_id: '55',
        slack_team_member_id: '55'
      }
      recognizements.create.mockResolvedValue({
        message: input.message,
        slack_team_member_id: input.slack_team_member_id,
      })
      slack_team_repository.get.mockResolvedValue({
        integration_key: 'integration key test',
        name: 'test',
        slack_id: input.slack_team_id,
      })
      const recognizement = await service.create_recognizement(input)
      expect(recognizement.message).toBe(input.message);
      expect(recognizement.slack_team_member_id).toBe(input.slack_team_member_id)
      expect(recognizement).not.toHaveProperty('slack_integration_key')
      expect(recognizement).not.toHaveProperty('slack_team_id')
    })

  })

  describe('.create', () => {

    test('when success', async () => {
      const slack_team_mock: SlackTeam = {
        integration_key: 'test',
        name: 'slack team name',
        slack_id: '55'
      }
      slack_api_team_repository.get.mockResolvedValue(slack_team_mock)
      slack_team_repository.create.mockResolvedValue(slack_team_mock);
      const created = await service.create({
        integration_key: 'test'
      });
      expect(created).toEqual(slack_team_mock);
      expect(slack_api_team_repository.get).lastCalledWith(slack_team_mock.integration_key);
      expect(slack_team_repository.create).toBeCalledWith(slack_team_mock);
    })

  })
})