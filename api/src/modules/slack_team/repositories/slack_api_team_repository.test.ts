import { describe, expect, test, beforeAll, jest } from '@jest/globals';
import { SlackApiTeamRepository } from '../@types/repositories/slack_api_team_repository';
import { SlackApiTeamRepositoryImpl } from './slack_api_team_repository';
import { Method, TeamInfoArguments, TeamInfoResponse } from '@slack/web-api';
import { SlackTeamInfoObtentionError } from '../../../errors/slack_team_info_obtention_error';

const infoMock = jest.fn<Method<TeamInfoArguments, TeamInfoResponse>>()

jest.mock('@slack/web-api', () => {
  return {
    WebClient: class {
      team = {
        info: infoMock
      }
    }
  }
})

describe('SlackApiTeamRepository', () => {
  let repository: SlackApiTeamRepository;

  beforeAll(async () => {
    repository = new SlackApiTeamRepositoryImpl()
  })

  describe('.get', () => {

    test('when success', async () => {
      infoMock.mockResolvedValue({ ok: true, team: {
        name: 'test',
        id: '100'
      } })
      await repository.get('5')
      expect(infoMock).toBeCalledTimes(1)
    })

    test('when an error occurs', async () => {
      infoMock.mockResolvedValue({ ok: false, error: 'mock_error' })
      const create_promise = repository.get('10')
      await expect(create_promise).rejects.toBeInstanceOf(SlackTeamInfoObtentionError)
      expect(infoMock).toBeCalledTimes(1)
    })

  })
})