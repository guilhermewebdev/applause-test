import { Settings } from "./@types/settings";

const {
  PORT = 8080,
  HOST = '0.0.0.0',
  DB_URL,
  DB_NAME,
} = process.env;

export default {
  server: {
    port: Number(PORT),
    host: HOST
  },
  db: {
    name: DB_NAME,
    options: {},
    client: {
      url: DB_URL,
      options: {}
    }
  }
} as Settings