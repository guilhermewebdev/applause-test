import { ErrorProcessing } from "../../lib/error_handler";
import { SlackTeamMemberController } from "./@types/controller";
import { SlackTeamMember, SlackTeamMemberListInput, SlackTeamMemberOutput } from "./@types/entities";
import { SlackTeamMemberService } from "./@types/service";
import { SlackTeamMemberValidator } from "./validator";
import * as yup from 'yup';

@ErrorProcessing
export class SlackTeamMemberControllerImpl implements SlackTeamMemberController {
  private readonly slack_team_members: SlackTeamMemberService;

  constructor(slack_team_members: SlackTeamMemberService) {
    this.slack_team_members = slack_team_members;
  }

  list: SlackTeamMemberController['list'] = async (req, res) => {
    const { slack_team_id } = req.params;
    const { page_cursor } = req.query;
    const payload: SlackTeamMemberListInput = {
      slack_team_id,
      page_cursor,
    }
    const validated = await SlackTeamMemberValidator.list.validate(payload, { stripUnknown: true });
    const {
      next_page_cursor,
      slack_team_members
    } = await this.slack_team_members.list(validated);
    const response = {
      next_page_cursor,
      slack_team_members: await Promise.all(slack_team_members.map(this.serialize))
    }
    res.status(200).json(response)
  }

  private async serialize(slack_team_member: SlackTeamMember): Promise<SlackTeamMemberOutput> {
    const schema = yup.object().shape({
      email: yup.string().required(),
      slack_id: yup.string().required(),
      name: yup.string().required(),
      avatar_url: yup.string().url(),
    });
    return schema.cast(slack_team_member, { stripUnknown: true });
  }
}