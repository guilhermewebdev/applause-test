import { RequestHandler } from "express";

export interface RecognizementPolicy {
  readonly create: RequestHandler;
}
