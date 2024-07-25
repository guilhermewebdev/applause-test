import { DbOptions, MongoClientOptions } from "mongodb";
import { json } from 'express';
import morgan from "morgan";
import helmet from 'helmet';
import { Request, Response } from 'express';

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
  },
  middlewares: {
    json: Parameters<typeof json>,
    morgan: [format: string, options?: morgan.Options<Request, Response>],
    helmet: Parameters<typeof helmet>
  }
}