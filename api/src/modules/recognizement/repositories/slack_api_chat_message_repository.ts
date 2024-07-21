import { WebClient } from "@slack/web-api";
import { Recognizement } from "../@types/entities";
import { SlackApiChatMessageRepository } from "../@types/repositories/slack_api_chat_message_repository";
import { SlackMessageCreationError } from "../../../errors/slack_message_creation_error";

export class SlackApiChatMessageRepositoryImpl implements SlackApiChatMessageRepository {
  private readonly slack: WebClient;

  constructor(slack_client: WebClient) {
    this.slack = slack_client;
  }

  async create(payload: Recognizement): Promise<void> {
    const message = await this.slack.chat.postMessage({
      text: payload.message,
      channel: payload.slack_team_member_id
    })
    if(!message.ok) throw new SlackMessageCreationError(message.error);
  }
}