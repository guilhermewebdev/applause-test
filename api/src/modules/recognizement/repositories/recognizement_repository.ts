import { Collection } from "mongodb";
import { Recognizement } from "../@types/entities";
import { RecognizementRepository } from "../@types/repositories/recognizement_repository";
import { DataInsertionError } from "../../../errors/data_insertion_error";

export class RecognizementRepositoryImpl implements RecognizementRepository {
  private readonly recognizements: Collection<Recognizement>;

  constructor(recognizements: Collection<Recognizement>) {
    this.recognizements = recognizements;
  }

  async create(payload: Recognizement): Promise<Recognizement> {
    const inserted = await this.recognizements.insertOne(payload);
    const recognizement = await this.recognizements.findOne(inserted.insertedId)
    if(!recognizement) throw new DataInsertionError();
    return recognizement;
  }
}