import { DbOptions, MongoClientOptions } from "mongodb";

export interface Settings {
  server: {
    port: number;
    host: string;
  },
  db: {
    name: string;
    options: DbOptions;
    client: {
      url: string;
      options?: MongoClientOptions;
    }
  }
}