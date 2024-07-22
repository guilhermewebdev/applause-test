import * as yup from 'yup';
import { RecognizementCreationInput } from './@types/entities';

export class SlackTeamValidator {
  static readonly create_recognizement = yup.object().shape({
    message: yup.string().required(''),
    slack_team_member_id: yup.string().required(''),
    slack_team_id: yup.string().required(''),
  })
}
