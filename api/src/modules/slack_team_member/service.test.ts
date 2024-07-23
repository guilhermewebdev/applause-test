import { describe, test, beforeEach, expect } from '@jest/globals';
import { SlackTeamMemberService } from './@types/service';
import { SlackTeamMemberServiceImpl } from './service';
import { SlackApiTeamMemberRepositoryMock } from './mocks/repositories/slack_api_team_member_mock';
import { SlackTeamMemberListInput } from './@types/entities';
import { SlackTeamServiceMock } from '../slack_team/mocks/slack_team_service_mock';
import { SlackTeam } from '../slack_team/@types/entities';

describe('SlackTeamMemberService', () => {
  let service: SlackTeamMemberService;
  let slack_api_team_member_repository: SlackApiTeamMemberRepositoryMock;
  let slack_team_service: SlackTeamServiceMock;

  beforeEach(async () => {
    slack_api_team_member_repository = new SlackApiTeamMemberRepositoryMock()
    slack_team_service = new SlackTeamServiceMock()
    service = new SlackTeamMemberServiceImpl(
      slack_api_team_member_repository,
      slack_team_service,
    )
  })

  describe('.list', () => {
    test('when success', async () => {
      const fake_data = {
        next_page_cursor: '==fdf',
        slack_team_members: [{
          email: 'test@email.com',
          name: 'test name',
          slack_id: '55',
          avatar_url: 'https://test.com/image.png'
        }]
      }
      slack_api_team_member_repository.list.mockResolvedValueOnce(fake_data)
      const slack_team: SlackTeam = {
        integration_key: '100df',
        name: 'test team',
        slack_id: '55'
      }
      slack_team_service.get.mockResolvedValueOnce(slack_team)
      const payload: SlackTeamMemberListInput = {
        slack_team_id: '55',
        page_cursor: '321'
      }
      const list = await service.list(payload);
      expect(list).toEqual(fake_data);
      expect(slack_api_team_member_repository.list).toBeCalledWith(
        slack_team,
        '321'
      );
      expect(slack_team_service.get).toBeCalledWith('55');
    })
  })
})