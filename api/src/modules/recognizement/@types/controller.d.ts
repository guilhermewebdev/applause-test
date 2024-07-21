import { RequestHandler } from "express";
import { RecognizementInput, RecognizementOutput } from "./entities";

export interface RecognizementController {
  create: RequestHandler<
    void,
    { recognizement: RecognizementInput },
    { recognizement: RecognizementOutput }
  >;
}