import { describe, expect, test, beforeAll, afterAll, jest } from '@jest/globals';
import { WebClient } from '@slack/web-api';
import { SlackApiChatMessageRepositoryImpl } from './slack_api_chat_message_repository';
import { SlackApiChatMessageRepository } from '../@types/repositories/slack_api_chat_message_repository';
import { SlackMessageCreationError } from '../../../errors/slack_message_creation_error';

describe('SlackApiChatMessageRepository', () => {
  let slack_client: WebClient;
  let repository: SlackApiChatMessageRepository;

  beforeAll(async () => {
    slack_client = new WebClient();
    repository = new SlackApiChatMessageRepositoryImpl(slack_client)
  })

  describe('.create', () => {

    test('when success', async () => {
      slack_client.chat.postMessage = jest.fn(async () => ({ ok: true }));
      await repository.create({
        message: 'test message',
        slack_team_member_id: '10',
      })
      expect(slack_client.chat.postMessage).toBeCalledTimes(1);
    })

    test('when the error occurs', async () => {
      slack_client.chat.postMessage = jest.fn(async () => ({ ok: false }));
      expect(async () => {
        await repository.create({
          message: 'test message',
          slack_team_member_id: '10',
        })
      }).rejects.toBeInstanceOf(SlackMessageCreationError)
      expect(slack_client.chat.postMessage).toBeCalledTimes(1);
    })

  })
})