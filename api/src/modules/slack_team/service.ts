import { SlackTeamService } from "./@types/service";
import { Recognizement, RecognizementService } from "../recognizement/@types";
import { RecognizementCreationInput, SlackTeam, SlackTeamInput } from "./@types/entities";
import { SlackTeamRepository } from "./@types/repositories/slack_team_repository";
import { SlackApiTeamRepository } from "./@types/repositories/slack_api_team_repository";

export class SlackTeamServiceImpl implements SlackTeamService {
  private readonly recognizements: RecognizementService;
  private readonly slack_team_repository: SlackTeamRepository;
  private readonly slack_api_team_repository: SlackApiTeamRepository;

  constructor(
    recognizements: RecognizementService,
    slack_team_repository: SlackTeamRepository,
    slack_api_team_repository: SlackApiTeamRepository
  ) {
    this.recognizements = recognizements;
    this.slack_team_repository = slack_team_repository;
    this.slack_api_team_repository = slack_api_team_repository;
  }

  async create_recognizement(payload: RecognizementCreationInput): Promise<Recognizement> {
    const { slack_team_id, ...recognizement_payload} = payload;
    const slack_team = await this.slack_team_repository.get(slack_team_id);
    return this.recognizements.create({
      ...recognizement_payload,
      slack_integration_key: slack_team.integration_key,
    });
  }

  async create(payload: SlackTeamInput): Promise<SlackTeam> {
    const { integration_key } = payload;
    const slack_team = await this.slack_api_team_repository.get(integration_key);
    const created = await this.slack_team_repository.create(slack_team);
    return created;
  }

  async delete(id: string): Promise<void> {
    return;
  }

  async list(): Promise<SlackTeam[]> {
    return this.slack_team_repository.list()
  }
}