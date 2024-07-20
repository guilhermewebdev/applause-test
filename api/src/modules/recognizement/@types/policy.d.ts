import { RequestHandler } from "express";

export interface RecognizementPolicy {
  create: RequestHandler;
}
