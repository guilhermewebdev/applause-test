import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { SlackTeamRepository } from '../@types/repositories/slack_team_repository';
import { SlackTeamRepositoryImpl } from './slack_team_repository';
import { Collection, Db, MongoClient } from 'mongodb';
import { SlackTeam } from '../@types/entities';
import { NotFoundError } from '../../../errors/not_found_error';

describe('SlackTeamRepository', () => {
  let repository: SlackTeamRepository;
  let collection: Collection<SlackTeam>;
  let connection: MongoClient;
  let db: Db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__);
    db = connection.db(globalThis.__MONGO_DB_NAME__);
    collection = db.collection<SlackTeam>('slack_team')
    repository = new SlackTeamRepositoryImpl(collection)
  })

  afterAll(async () => {
    await connection.close(true)
  })
  
  describe('.get', () => {
    test('when success', async () => {
      const slack_team: SlackTeam = {
        integration_key: '55',
        name: 'slack team test',
        slack_id: '33'
      }
      await collection.insertOne(slack_team)
      const recovered = await repository.get(slack_team.slack_id);
      expect(recovered).toEqual(slack_team);
    })

    test('when not found', async () => {
      await expect(repository.get('0')).rejects.toBeInstanceOf(NotFoundError)
    })
  })
})