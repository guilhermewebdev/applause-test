import { Recognizement } from "./entities";

export interface RecognizementController {
  create(payload: Recognizement): Promise<Recognizement>;
}