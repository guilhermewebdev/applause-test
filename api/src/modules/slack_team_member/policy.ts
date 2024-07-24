import { ErrorProcessing } from "../../lib/error_handler";
import { SlackTeamMemberPolicy } from "./@types/policy";

@ErrorProcessing
export class SlackTeamMemberPolicyImpl implements SlackTeamMemberPolicy {
  list: SlackTeamMemberPolicy['list'] = async (_req, _res, next) => {
    next()
  }
}