import { jest } from "@jest/globals";
import { RecognizementRepository } from "../../@types/repositories/recognizement_repository";

export class RecognizementRepositoryMock implements RecognizementRepository {
  create = jest.fn<RecognizementRepository['create']>()
}
