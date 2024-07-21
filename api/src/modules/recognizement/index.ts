import { Db } from 'mongodb'
import { RecognizementModule } from './@types/module'
import { RecognizementService } from './@types/service'
import { RecognizementRepositoryImpl } from './repositories/recognizement_repository'
import { SlackApiChatMessageRepositoryImpl } from './repositories/slack_api_chat_message_repository'
import { RecognizementServiceImpl } from './service'
import { Recognizement } from './@types/entities'

export * from './@types/entities'
export * from './@types/repositories/recognizement_repository'
export * from './@types/repositories/slack_api_chat_message_repository'
export * from './@types/service'
export * from './@types/module'

export class RecognizementModuleImpl implements RecognizementModule {
  readonly service: RecognizementService;

  constructor(db: Db) {
    const db_collection = db.collection<Recognizement>('notifications');
    const recognizement_repository = new RecognizementRepositoryImpl(db_collection);
    const slack_api_chat_message_repository = new SlackApiChatMessageRepositoryImpl();
    this.service = new RecognizementServiceImpl(
      recognizement_repository,
      slack_api_chat_message_repository
    )
  }
}