import { error_processing } from "../../lib/error_handler";
import { SlackTeamMemberPolicy } from "./@types/policy";

@error_processing
export class SlackTeamMemberPolicyImpl implements SlackTeamMemberPolicy {
  list: SlackTeamMemberPolicy['list'] = async (_req, _res, next) => {
    next()
  }
}