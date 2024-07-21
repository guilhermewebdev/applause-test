import { WebClient } from "@slack/web-api";
import { RecognizementInput } from "../@types/entities";
import { SlackApiChatMessageRepository } from "../@types/repositories/slack_api_chat_message_repository";
import { SlackMessageCreationError } from "../../../errors/slack_message_creation_error";

export class SlackApiChatMessageRepositoryImpl implements SlackApiChatMessageRepository {

  async create(payload: RecognizementInput): Promise<void> {
    const slack = await this.get_slack_client(payload.slack_integration_key);
    const message = await slack.chat.postMessage({
      text: payload.message,
      channel: payload.slack_team_member_id
    })
    if(!message.ok) throw new SlackMessageCreationError(message.error);
  }

  private async get_slack_client(integration_key: string) {
    return new WebClient(integration_key);
  }
}