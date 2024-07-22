import { Application } from "./modules/application"
import settings from './settings';

!async function main() {
  const app = new Application(settings);
  await app.start();
}