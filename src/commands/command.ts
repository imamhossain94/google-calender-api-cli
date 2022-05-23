import { Argv } from "yargs";
import { StartCommand } from "./start_command";
import { EventsCommand } from "./events_command";

export const registerCommands = (argv: Argv) => {
  argv.command(StartCommand);
  argv.command(EventsCommand);
  return argv;
};
