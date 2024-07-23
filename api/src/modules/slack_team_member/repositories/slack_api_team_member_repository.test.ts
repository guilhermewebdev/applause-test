import { describe, expect, test, beforeAll, jest } from '@jest/globals';
import { SlackApiTeamMemberRepository } from '../@types/repositories/slack_api_team_member_repository';
import { SlackApiTeamMemberRepositoryImpl } from './slack_api_team_member_repository';
import { Method, TeamInfoArguments, TeamInfoResponse, UsersListArguments, UsersListResponse, WebClient } from '@slack/web-api';
import { SlackTeamInfoObtentionError } from '../../../errors/slack_team_info_obtention_error';
import { SlackTeam } from '../../slack_team/@types/entities';

const listMock = jest.fn<Method<UsersListArguments, UsersListResponse>>()

jest.mock('@slack/web-api', () => {
  return {
    WebClient: class {
      users = {
        list: listMock
      }
    }
  }
})

describe('SlackApiTeamMemberRepository', () => {
  let repository: SlackApiTeamMemberRepository;

  beforeAll(async () => {
    repository = new SlackApiTeamMemberRepositoryImpl()
  })

  describe('.list', () => {

    test('when success', async () => {
      listMock.mockResolvedValue({ 
        ok: true, 
        members: [{
          name: 'test name',
          profile: {
            email: 'test@email.com',
            image_48: 'http://test.com/image.png'
          },
          id: '100'
        }]
      })
      const slack_team: SlackTeam = {
        integration_key: '100',
        name: 'test',
        slack_id: '44'
      }
      const list = await repository.list(slack_team, '123')
      expect(list).toEqual({
        slack_team_members: [{
          email: 'test@email.com',
          name: 'test name',
          slack_id: '100',
          avatar_url: 'http://test.com/image.png'
        }],
        next_page_cursor: undefined,
      })
      expect(listMock).toBeCalledWith({
        limit: 100,
        cursor: '123',
        team_id: '44'
      })
    })

  })
})