import { describe, expect, test, beforeAll, jest } from '@jest/globals';
import { ChatPostMessageArguments, ChatPostMessageResponse, Method } from '@slack/web-api';
import { SlackApiChatMessageRepositoryImpl } from './slack_api_chat_message_repository';
import { SlackApiChatMessageRepository } from '../@types/repositories/slack_api_chat_message_repository';
import { SlackMessageCreationError } from '../../../errors/slack_message_creation_error';

const postMessageMock = jest.fn<Method<ChatPostMessageArguments, ChatPostMessageResponse>>()

jest.mock('@slack/web-api', () => {
  return {
    WebClient: class {
      chat = {
        postMessage: postMessageMock
      }
    }
  }
})

describe('SlackApiChatMessageRepository', () => {
  let repository: SlackApiChatMessageRepository;

  beforeAll(async () => {
    repository = new SlackApiChatMessageRepositoryImpl()
  })

  describe('.create', () => {

    test('when success', async () => {
      postMessageMock.mockResolvedValue({ ok: true })
      await repository.create({
        message: 'test message',
        slack_team_member_id: '10',
        slack_integration_key: '555'
      })
    })

    test('when the error occurs', async () => {
      postMessageMock.mockResolvedValue({ ok: false, error: 'mock_error' })
      const create_promise = repository.create({
        message: 'test message',
        slack_team_member_id: '10',
        slack_integration_key: '555'
      })
      await expect(create_promise).rejects.toBeInstanceOf(SlackMessageCreationError)
    })

  })
})