import { Auth } from "googleapis";
import { CommandModule } from "yargs";
import { getToken } from "../modules/google-api-auth/google-api-auth";
import { makeOAuth2Client, readFileAsync } from "../utils/utils";
import { YOUR_REFRESH_TOKEN_PATH } from "../config";
import { makeCalendarClient } from "../modules/google-calender/calendar";

export const EventsCommand: CommandModule = {
  command: "events",
  aliases: "e",
  describe: "Get Google Calendar event",
  builder: {},
  handler: async () => {

    console.log("funcikk");
    let credentials: Auth.Credentials;
    const oauth2Client = makeOAuth2Client();

    try {
      credentials = await readTokenFromFile();
      oauth2Client.credentials = credentials;
      console.log(`✅ You are ready to go!`);

      await makeCalendarClient(oauth2Client);
    } catch (e) {
      console.log(`❌ Run this command first: "npm run gcal start"`);
    }
  },
};

async function readTokenFromFile(): Promise<Auth.Credentials> {
    const content = await readFileAsync(YOUR_REFRESH_TOKEN_PATH);
    return JSON.parse(content.toString("utf8"));
}


