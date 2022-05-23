import { google } from 'googleapis';
import { promisify } from 'util';
import { YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, YOUR_REDIRECT_URL } from '../config';
import fs from "fs";
import { setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns';

export function makeOAuth2Client() {
  return new google.auth.OAuth2(
    YOUR_CLIENT_ID,
    YOUR_CLIENT_SECRET,
    YOUR_REDIRECT_URL
  );
}

export const resetTime = (date: Date) =>
  setMilliseconds(setHours(setMinutes(setSeconds(date, 0), 0), 0), 0);
  
export const readFileAsync = promisify(fs.readFile);
export const writeFileAsync = promisify(fs.writeFile);