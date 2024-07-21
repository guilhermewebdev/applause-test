import { RecognizementPolicy } from "./@types/policy";

export class RecognizementPolicyImpl implements RecognizementPolicy {
  readonly create: RecognizementPolicy['create'] = async (_req, _res, next) => {
    next();
  };
}