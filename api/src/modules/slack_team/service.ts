import { SlackTeamService } from "./@types/service";
import { Recognizement, RecognizementService } from "../recognizement";
import { RecognizementCreationInput } from "./@types/entities";
import { SlackTeamRepository } from "./@types/repositories/slack_team_repository";

export class SlackTeamServiceImpl implements SlackTeamService {
  private readonly recognizements: RecognizementService;
  private readonly slack_team_repository: SlackTeamRepository;

  constructor(
    recognizements: RecognizementService,
    slack_team_repository: SlackTeamRepository
  ) {
    this.recognizements = recognizements;
    this.slack_team_repository = slack_team_repository;
  }

  async create_recognizement(payload: RecognizementCreationInput): Promise<Recognizement> {
    const { slack_team_id, ...recognizement_payload} = payload;
    const slack_team = await this.slack_team_repository.get(slack_team_id);
    return this.recognizements.create({ 
      ...recognizement_payload,
      slack_integration_key: slack_team.integration_key
    });
  }
}