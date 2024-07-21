export interface SlackTeamMember {
  email: string;
  slack_id: string;
  name: string;
  avatar_url?: string;
}

export interface SlackTeamMemberOutput extends SlackTeamMember {}