import { RequestHandler } from "express";
import { Recognizement, RecognizementInput, RecognizementOutput } from "./entities";

export interface RecognizementController {
  create: RequestHandler<{}, RecognizementInput, RecognizementOutput>;
}