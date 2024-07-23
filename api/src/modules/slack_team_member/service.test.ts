import { describe, test, beforeEach, expect } from '@jest/globals';
import { SlackTeamMemberService } from './@types/service';
import { SlackTeamMemberServiceImpl } from './service';
import { SlackApiTeamMemberRepositoryMock } from './mocks/slack_api_team_member_mock';


describe('SlackTeamMemberService', () => {
  let service: SlackTeamMemberService;
  let slack_api_team_member_repository: SlackApiTeamMemberRepositoryMock;

  beforeEach(async () => {
    slack_api_team_member_repository = new SlackApiTeamMemberRepositoryMock()
    service = new SlackTeamMemberServiceImpl(slack_api_team_member_repository)
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
      const list = await service.list('55');
      expect(list).toEqual(fake_data);
      expect(slack_api_team_member_repository.list).toBeCalledWith('55');
    })
  })
})