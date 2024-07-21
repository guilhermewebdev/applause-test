import { Recognizement, RecognizementInput } from "../entities";

export interface SlackApiChatMessageRepository {
  create(payload: RecognizementInput): Promise<void>;
}