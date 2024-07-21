import { describe, expect, test } from '@jest/globals';
import { SlackTeamService } from './@types/service';
import { beforeEach } from 'node:test';
import { SlackTeamServiceImpl } from './service';
import { RecognizementServiceMock } from '../recognizement/mocks/service';
import { SlackTeamRepositoryMock } from './mocks/repositories/slack_team_repository_mock';

describe('SlackTeamService', () => {
  let service: SlackTeamService;

  beforeEach(async () => {
    const recognizements = new RecognizementServiceMock()
    const slack_team_repository = new SlackTeamRepositoryMock()
    service = new SlackTeamServiceImpl(recognizements, slack_team_repository)
  })

  describe('.create_recognizement', () => {
    test('when success', async () => {
      const recognizement = await service.create_recognizement({
        message: 'test message',
        slack_team_id: '55',
        slack_team_member_id: '55'
      })
      expect(recognizement.message).toBe('test message');
      expect(recognizement.slack_team_member_id).toBe('55')
      expect(recognizement).not.toHaveProperty('slack_integration_key')
    })
  })
})