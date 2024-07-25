import { Recognizement, RecognizementInput } from "./entities";

export interface RecognizementService {
  create(payload: RecognizementInput): Promise<Recognizement>;
}