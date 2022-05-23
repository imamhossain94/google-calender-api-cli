import { YOUR_REFRESH_TOKEN_PATH } from '../../config';
import inquirer from "inquirer";
import fs from "fs";
import { OAuth2Client } from 'google-auth-library';
import { Auth } from 'googleapis';

export async function getToken(oauth2Client: OAuth2Client): Promise<Auth.Credentials> {

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    // scopes are documented here: 
    // https://developers.google.com/identity/protocols/oauth2/scopes#calendar
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',	
    ],
  });

  console.log(`Go to this URL to acquire a refresh token:\n\n${url}\n`);
  const question: inquirer.Question = {
    type: "input",
    message: "Enter the code from that page here:",
    name: "code",
  };
  const { code } = await inquirer.prompt([question]);
  const { tokens } = await oauth2Client.getToken(code);
  fs.writeFileSync(YOUR_REFRESH_TOKEN_PATH, JSON.stringify(tokens));
  console.log(tokens);

  return tokens;
}

