import { SlackTeamMemberPolicy } from "./@types/policy";

export class SlackTeamMemberPolicyImpl implements SlackTeamMemberPolicy {
  list: SlackTeamMemberPolicy['list'] = async (_req, _res, next) => {
    next()
  }
}