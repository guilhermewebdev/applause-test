import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { Db, MongoClient } from 'mongodb';
import { RecognizementRepository } from '../@types/repositories/recognizement_repository';
import { RecognizementRepositoryImpl } from './recognizement_repository';
import { Recognizement } from '../@types/entities';

describe('RecognizementRepository', () => {
  let connection: MongoClient;
  let db: Db;
  let repository: RecognizementRepository;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__);
    db = connection.db(globalThis.__MONGO_DB_NAME__);
    const collection = db.collection<Recognizement>('notifications')
    repository = new RecognizementRepositoryImpl(collection)
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('.create', () => {
    test('when success', async () => {
      const recognizement = await repository.create({
        message: 'test message',
        slack_team_member_id: '50'
      })
      expect(recognizement.message).toBe('test message')
      expect(recognizement.slack_team_member_id).toBe('50')
    })
  })
})