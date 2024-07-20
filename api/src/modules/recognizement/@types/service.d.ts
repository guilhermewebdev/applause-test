import { Recognizement } from "./entities";

export interface RecognizementService {
  create(payload: Recognizement): Promise<Recognizement>;
}