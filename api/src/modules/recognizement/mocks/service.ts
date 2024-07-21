import { RecognizementService } from "../@types/service";
import { jest } from '@jest/globals';

export class RecognizementServiceMock implements RecognizementService {
  create = jest.fn<RecognizementService['create']>();
}