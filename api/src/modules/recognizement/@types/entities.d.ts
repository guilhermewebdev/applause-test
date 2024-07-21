export interface Recognizement {
  message: string;
  slack_team_member_id: string;
}

export interface RecognizementInput extends Recognizement {}

export interface RecognizementOutput extends Recognizement {}