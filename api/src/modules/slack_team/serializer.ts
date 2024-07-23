import { SlackTeam, SlackTeamOutput } from "./@types/entities";
import * as yup from 'yup';

export async function slack_team_serializer(slack_team: SlackTeam): Promise<SlackTeamOutput> {
  const schema = yup.object().shape({
    slack_id: yup.string().required(),
    name: yup.string().required(),
  })
  return schema.cast(slack_team);
}