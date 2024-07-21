import { Recognizement, RecognizementInput } from "./@types/entities";
import { RecognizementRepository } from "./@types/repositories/recognizement_repository";
import { SlackApiChatMessageRepository } from "./@types/repositories/slack_api_chat_message_repository";
import { RecognizementService } from "./@types/service";

export class RecognizementServiceImpl implements RecognizementService {
  private readonly recognizement_repository: RecognizementRepository;
  private readonly slack_api_chat_message_repository: SlackApiChatMessageRepository;

  constructor(
    recognizement_repository: RecognizementRepository,
    slack_api_chat_message_repository: SlackApiChatMessageRepository
  ) {
    this.recognizement_repository = recognizement_repository;
    this.slack_api_chat_message_repository = slack_api_chat_message_repository;
  }

  async create(payload: RecognizementInput): Promise<Recognizement> {
    const { slack_integration_key, ...recognizement_data } = payload;
    const recognizement = await this.recognizement_repository.create(recognizement_data);
    await this.slack_api_chat_message_repository.create(payload);
    return recognizement;
  }
}