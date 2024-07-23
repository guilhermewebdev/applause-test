import * as yup from 'yup';

export class SlackTeamValidator {
  static readonly create_recognizement = yup.object().shape({
    message: yup.string().required(),
    slack_team_member_id: yup.string().required(),
    slack_team_id: yup.string().required(),
  })

  static readonly create = yup.object().shape({
    integration_key: yup.string().required()
  })
}
