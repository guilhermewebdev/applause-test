import { RequestHandler } from "express";
import { Recognizement, RecognizementInput, RecognizementOutput } from "./entities";

export interface RecognizementController {
  create: RequestHandler<
    {},
    { recognizement: RecognizementInput },
    { recognizement: RecognizementOutput }
  >;
}