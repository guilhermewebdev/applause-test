declare interface Recognizement {
  message: string;
  slack_team_member_id: string;
}

declare interface SlackTeam {
  slack_id: string;
  name: string;
}

declare interface SlackTeamMember {
  email: string;
  slack_id: string;
  name: string;
  avatar_url?: string;
}

declare interface MutationResponse {
  message: string;
  ok: boolean;
}