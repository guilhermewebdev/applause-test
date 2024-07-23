import { recognizement_serializer } from "../recognizement/serializer";
import { SlackTeamController } from "./@types/controller";
import { RecognizementCreationInput, SlackTeamInput } from "./@types/entities";
import { SlackTeamService } from "./@types/service";
import { slack_team_serializer } from "./serializer";
import { SlackTeamValidator } from "./validator";

export class SlackTeamControllerImpl implements SlackTeamController {
  private readonly slack_teams: SlackTeamService;

  constructor(slack_teams: SlackTeamService) {
    this.slack_teams = slack_teams;
  }

  public create_recognizement: SlackTeamController['create_recognizement'] = async (req, res) => {
    const { slack_id } = req.params;
    const payload = {
      ...req.body.recognizement,
      slack_team_id: slack_id,
    }
    const validated: RecognizementCreationInput = await SlackTeamValidator.create_recognizement.validate(payload);
    const recognizement = await this.slack_teams.create_recognizement(validated)
    const response = await recognizement_serializer(recognizement)
    return res.status(201).json({
      recognizement: response
    }).end();
  }

  public create: SlackTeamController['create'] = async (req, res) => {
    const { slack_team: payload } = req.body;
    const validated: SlackTeamInput = await SlackTeamValidator.create.validate(payload);
    const slack_team = await this.slack_teams.create(validated);
    const response = await slack_team_serializer(slack_team);
    return res.status(201).json({
      slack_team: response,
    }).end()
  }

  delete = async () => {

  }

  list = async () => {

  }
}
