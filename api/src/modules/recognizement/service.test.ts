import { RecognizementServiceImpl } from './service';
import { RecognizementRepositoryMock } from './mocks/repositories/recognizement_repository_mock';
import { SlackApiChatMessageRepositoryMock } from './mocks/repositories/slack_api_chat_message_repository_mock';
import { describe, expect, test } from '@jest/globals';

describe('RecognizementService', () => {
  const recognizement_repository = new RecognizementRepositoryMock()
  const slack_api_chat_message_repository = new SlackApiChatMessageRepositoryMock()
  const service = new RecognizementServiceImpl(
    recognizement_repository,
    slack_api_chat_message_repository
  )

  describe('.create', () => {

    test('with success', async () => {
      const recognizement = await service.create({
        message: 'test message',
        slack_team_member_id: '10',
        slack_integration_key: '555'
      })
      expect(recognizement.message).toBe('test message')
      expect(recognizement.slack_team_member_id).toBe('10')
      expect(recognizement_repository.create).toBeCalledTimes(1)
      expect(slack_api_chat_message_repository.create).toBeCalledTimes(1)
      expect(recognizement).not.toHaveProperty('slack_integration_key')
    })

  })
})