import { Recognizement } from "../entities";

export interface SlackApiChatMessageRepository {
  create(payload: Recognizement): Promise<Recognizement>;
}