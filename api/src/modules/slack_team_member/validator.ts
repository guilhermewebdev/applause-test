import * as yup from 'yup';

export class SlackTeamMemberValidator {
  static readonly list = yup.object().shape({
    page_cursor: yup.string(),
    slack_team_id: yup.string().required()
  })
}