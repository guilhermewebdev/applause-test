import { Recognizement } from "../../recognizement/@types";

export interface SlackTeam {
  integration_key: string;
  slack_id: string;
  name: string;
}

export interface SlackTeamInput extends Omit<SlackTeam, 'slack_id' | 'name'> {}

export interface SlackTeamOutput extends Omit<SlackTeam, 'integration_key'> {}

export interface RecognizementCreationInput extends Recognizement {
  slack_team_id: string;
}