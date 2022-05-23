import { Auth, google } from "googleapis";
import { CommandModule } from "yargs";
import { getToken } from "../modules/google-api-auth/google-api-auth";
import { makeOAuth2Client, readFileAsync, resetTime } from "../utils/utils";
import { YOUR_REFRESH_TOKEN_PATH } from "../config";
import { insertEvent, makeCalendarClient } from "../modules/google-calender/calendar";
import { addHours } from "date-fns";
import inquirer from "inquirer";

export interface ParseResult {
  title: string;
  start: Date;
  end: Date;
  isAllDay: boolean;
}

export const InsertEventCommand: CommandModule = {
  command: "insert <info>",
  aliases: "i",
  describe: "Insert event into the Google Calendar",
  builder: {
    form: {
      alias: "f",
      describe: "Form time duration (2pm)",
      type: "string",
    },
    to: {
      alias: "t", 
      describe: "To time duration (4pm)",
      type: "string",
    },
  },
  handler: async (argv:any) => {
    let { info, form, to } = argv;

    // console.log(`$info: ${info}`);
    // console.log(`$form: ${argv.form}`);
    // console.log(`$to: ${to}`);
  
    // if(!info || !form || !to) {
    //   throw new Error("❌ Insert arguments are not valid");
    // }

    let options = parseArgv(info, form, to);

    const question: inquirer.Question = {
      type: "confirm",
      name: "confirm",
      default: false,
      message: `Are you sure to insert this event into calendar?`,
    };
    const { confirm } = await inquirer.prompt([question]);
    if (!confirm) {
      return;
    }


    let credentials: Auth.Credentials;
    const oauth2Client = makeOAuth2Client();

    try {
      credentials = await readTokenFromFile();
      oauth2Client.credentials = credentials;

      const calendarClient = google.calendar({
        version: 'v3',
        auth: oauth2Client,
      });
      
      const insertEventPromise = insertEvent(calendarClient)({
        start: options.start,
        end: options.end,
        isAllDay: options.isAllDay,
        title: options.title,
      })("primary");
      
      await insertEventPromise;

      console.log("✅ Event is inserted");

    } catch (e) {
      console.log(`❌ Run this command first: "npm run gcal start"`);
    }


  },
};

async function readTokenFromFile(): Promise<Auth.Credentials> {
    const content = await readFileAsync(YOUR_REFRESH_TOKEN_PATH);
    return JSON.parse(content.toString("utf8"));
}


export const parseArgv = (info: string, form: string, to:string): ParseResult => {
  
  return {
    title: info.toLowerCase(),
    start: resetTime(new Date()),
    end: addHours(resetTime(new Date()), 1),
    isAllDay: false,
  };

};

