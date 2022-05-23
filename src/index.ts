import yargs from "yargs";
import { registerCommands } from "./commands/command";

const argv = registerCommands(yargs);
argv.demandCommand(1, `Run this command first: "npm run gcal start`).help()
  .argv;