import { Argv } from "yargs";
import { StartCommand } from "./start_command";

export const registerCommands = (argv: Argv) => {
  argv.command(StartCommand);
  return argv;
};
