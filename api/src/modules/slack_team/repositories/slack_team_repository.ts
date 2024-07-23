import { Collection } from 'mongodb';
import { SlackTeam } from '../@types/entities';
import { SlackTeamRepository } from '../@types/repositories/slack_team_repository';
import { NotFoundError } from '../../../errors/not_found_error';
import { DataInsertionError } from '../../../errors/data_insertion_error';

export class SlackTeamRepositoryImpl implements SlackTeamRepository {
  private readonly slack_teams: Collection<SlackTeam>;
  
  constructor(slack_teams: Collection<SlackTeam>) {
    this.slack_teams = slack_teams;
    this.slack_teams.createIndex({ slack_id: 1 }, { unique: true });
  }

  async get(id: string): Promise<SlackTeam> {
    const slack_team = await this.slack_teams.findOne({ slack_id: id });
    if(!slack_team) throw new NotFoundError();
    return slack_team;
  }

  async create(payload: SlackTeam): Promise<SlackTeam> {
    const created = await this.slack_teams.insertOne(payload);
    const slack_team = await this.slack_teams.findOne({ _id: created.insertedId });
    if(!slack_team) throw new DataInsertionError()
    return slack_team;
  }

  async delete(id: string): Promise<void> {
    await this.slack_teams.deleteOne({
      slack_id: id
    });
  }

  async list(): Promise<SlackTeam[]> {
    const slack_teams = await this.slack_teams.find({}).toArray()
    return slack_teams;
  }
}