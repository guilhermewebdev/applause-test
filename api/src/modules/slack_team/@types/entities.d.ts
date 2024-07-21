export interface SlackTeam {
  integration_key: string;
  slack_id: string;
  name: string;
}

export interface SlackTeamInput extends Omit<SlackTeam, 'slack_id'> {}

export interface SlackTeamOutput extends Omit<SlackTeam, 'integration_key'> {}