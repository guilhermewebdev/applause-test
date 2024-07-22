import { recognizement_serializer } from "../recognizement/serializer";
import { SlackTeamController } from "./@types/controller";
import { RecognizementCreationInput } from "./@types/entities";
import { SlackTeamService } from "./@types/service";
import { SlackTeamValidator } from "./validator";

export class SlackTeamControllerImpl implements SlackTeamController {
  private readonly slack_teams: SlackTeamService;

  constructor(slack_teams: SlackTeamService) {
    this.slack_teams = slack_teams;
  }

  public create_recognizement: SlackTeamController['create_recognizement'] = async (req, res) => {
    const { slack_id } = req.params;
    const payload = {
      ...req.body,
      slack_id,
    }
    const validated: RecognizementCreationInput = await SlackTeamValidator.create_recognizement.validate(payload);
    const recognizement = await this.slack_teams.create_recognizement(validated)
    const response = await recognizement_serializer(recognizement)
    res.status(201).json({
      recognizement: response
    });
  }

  create = async () => {

  }

  delete = async () => {

  }

  list = async () => {

  }
}
