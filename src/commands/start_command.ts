import { Auth } from "googleapis";
import { CommandModule } from "yargs";
import { getToken } from "../modules/google-api-auth/google-api-auth";
import { makeOAuth2Client, readFileAsync } from "../utils/utils";
import { YOUR_REFRESH_TOKEN_PATH } from "../config";
import { makeCalendarClient } from "../modules/google-calender/calendar";

export const StartCommand: CommandModule = {
  command: "start",
  aliases: "s",
  describe: "Setup Google Calendar token",
  builder: {},
  handler: async () => {

    let credentials: Auth.Credentials;
    const oauth2Client = makeOAuth2Client();

    try {
        credentials = await readTokenFromFile();
    } catch (e) {
        credentials = await getToken(oauth2Client);
    }
    oauth2Client.credentials = credentials;
    console.log(`✅ You are ready to go!`);
    
    // setting up the calendar
    await makeCalendarClient(oauth2Client);

  },
};

async function readTokenFromFile(): Promise<Auth.Credentials> {
    const content = await readFileAsync(YOUR_REFRESH_TOKEN_PATH);
    return JSON.parse(content.toString("utf8"));
}


