import { SlackTeamPolicy } from "./@types/policy";

export class SlackTeamPolicyImpl implements SlackTeamPolicy {
  create_recognizement: SlackTeamPolicy['create_recognizement'] = async (_req, _res, next) => {
    next()
  }

  create: SlackTeamPolicy['create'] = async (_req, _res, next) => {
    next()
  }

  delete: SlackTeamPolicy['delete'] = async (_req, _res, next) => {
    next()
  }

  list: SlackTeamPolicy['list'] = async (_req, _res, next) => {
    next()
  }
}