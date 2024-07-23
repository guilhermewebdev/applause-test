import { afterAll, beforeAll, describe, expect, test, afterEach } from '@jest/globals';
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

  afterEach(async () => {
    await collection.deleteMany({});
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

  describe('.create', () => {
    test('when success', async () => {
      const payload: SlackTeam = {
        integration_key: '55',
        name: 'slack team test',
        slack_id: '35'
      }
      const created = await repository.create(payload);
      expect(created).toEqual(payload);
      const recovered = await collection.findOne({ slack_id: payload.slack_id });
      expect(recovered).toEqual({
        ...payload,
        _id: recovered?._id
      })
    })
  })

  describe('.delete', () => {
    test('when success', async () => {
      const slack_team: SlackTeam = {
        integration_key: '55',
        name: 'slack team test',
        slack_id: '33'
      }
      await collection.insertOne(slack_team)
      await repository.delete('33')
      const recovered = await collection.findOne({ slack_id: '33' })
      expect(recovered).toBeNull()
    })
  })
})