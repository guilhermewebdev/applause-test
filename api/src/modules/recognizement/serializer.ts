import { Recognizement, RecognizementOutput } from "./@types/entities";
import * as yup from 'yup';

export async function recognizement_serializer(recognizement: Recognizement): Promise<RecognizementOutput> {
  const schema = yup.object().shape({
    message: yup.string().required(),
    slack_team_member_id: yup.string().required(),
  })
  const result: RecognizementOutput = schema.cast(recognizement, { stripUnknown: true });
  return result;
}