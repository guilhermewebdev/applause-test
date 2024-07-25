import { Recognizement } from "../../recognizement";
import { RecognizementCreationInput, SlackTeam, SlackTeamInput } from "./entities";

export interface SlackTeamService {
  create(payload: SlackTeamInput): Promise<SlackTeam>;
  get(slack_id: string): Promise<SlackTeam>;
  list(): Promise<SlackTeam[]>;
  delete(id: string): Promise<void>;
  create_recognizement(payload: RecognizementCreationInput): Promise<Recognizement>;
}