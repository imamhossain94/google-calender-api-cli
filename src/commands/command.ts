import { Argv } from "yargs";
import { StartCommand } from "./start_command";
import { EventsCommand } from "./events_command";
import { InsertEventCommand } from "./insert_event_command";

export const registerCommands = (argv: Argv) => {
  argv.command(StartCommand);
  argv.command(EventsCommand);
  argv.command(InsertEventCommand);
  return argv;
};
