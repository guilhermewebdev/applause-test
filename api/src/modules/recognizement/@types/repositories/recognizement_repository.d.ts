import { Recognizement, RecognizementInput } from "../entities";

export interface RecognizementRepository {
  create(payload: Recognizement): Promise<Recognizement>;
}