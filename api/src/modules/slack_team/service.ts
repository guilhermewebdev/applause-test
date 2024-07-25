import { SlackTeamService } from "./@types/service";
import { Recognizement, RecognizementService } from "../recognizement/@types";
import { RecognizementCreationInput, SlackTeam, SlackTeamInput } from "./@types/entities";
import { SlackTeamRepository } from "./@types/repositories/slack_team_repository";
import { SlackApiTeamRepository } from "./@types/repositories/slack_api_team_repository";
import { NotFoundError } from "../../errors/not_found_error";
import { DuplicatedEntryError } from "../../errors/duplicated_entry_error";

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
    const recovered = await this.slack_team_repository.get(slack_team.slack_id)
      .catch((error: any) => {
        if(!(error instanceof NotFoundError)) throw new DuplicatedEntryError(slack_team.name) 
      })
    if(recovered) throw new DuplicatedEntryError(slack_team.name)
    const created = await this.slack_team_repository.create(slack_team);
    return created;
  }

  async delete(id: string): Promise<void> {
    await this.slack_team_repository.delete(id);
  }

  async list(): Promise<SlackTeam[]> {
    return this.slack_team_repository.list()
  }

  async get(slack_id: string): Promise<SlackTeam> {
    return this.slack_team_repository.get(slack_id);
  }
}