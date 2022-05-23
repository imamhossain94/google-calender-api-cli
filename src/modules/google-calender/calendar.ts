import { calendar_v3, google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { Calendar } from './models/calendar';
import { plainToClass } from "class-transformer";
import addWeeks from "date-fns/add_weeks";
import { GCalEvent } from './models/event';
import { flatten, isEmpty } from "lodash";
import setMilliseconds from 'date-fns/set_milliseconds';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';
import setSeconds from 'date-fns/set_seconds';
import addDays from 'date-fns/add_days';

export interface ListEventOptions {
  timeMin?: Date;
  timeMax?: Date;
}

export async function makeCalendarClient(oauth2Client: OAuth2Client) {

  const calendarClient = google.calendar({
    version: 'v3',
    auth: oauth2Client,
  });

  console.log(`✅ Calender client connected!`);

  // get calender ides
  const params: calendar_v3.Params$Resource$Calendarlist$List = {
    maxResults: 100,
  };
  const { data } = await calendarClient.calendarList.list(params);
  const { items } = data;
  const calendars = plainToClass<Calendar, {}[]>(Calendar, items!);
  console.log(`✅ Calender client ready!`);
  const calendarIds = calendars.map((calendar) => calendar.id);

  // get events
  const options = {
    from: new Date(),
    to: setMilliseconds(setHours(setMinutes(setSeconds(addDays(new Date(), 3), 0), 0), 0), 0),
  };

  const listEventPromises = calendarIds.map((calendarId) =>
    listEvents(calendarClient, calendarId, {
      timeMin: options.from,
      timeMax: options.to,
    })
  );

  const eventPromiseResponses = await Promise.all(listEventPromises);
  let gCalEvents = flatten(eventPromiseResponses);


  if(gCalEvents) {
    console.log(`✅ Calender events are ready!`);
    for (let i = 0; i < gCalEvents.length; i++) {
      console.log('☑️');
      const gCalEvent = gCalEvents[i];
      console.log(`Summary: ${gCalEvent.summary}`);
      console.log(`CalendarId: ${gCalEvent.calendarId}`);
    }
  }else{
    console.log(`❌ Event is empty!`);
  }

  

}

export const listEvents = async (
  calendarClient: calendar_v3.Calendar,
  calendarId = "primary",
  options: ListEventOptions = {}
) => {
  const params: calendar_v3.Params$Resource$Events$List = {
    calendarId: calendarId,
    timeMin: options.timeMin
      ? options.timeMin.toISOString()
      : new Date().toISOString(),
    timeMax: options.timeMax? options.timeMax.toISOString(): addWeeks(new Date(), 1).toISOString(),
    maxResults: 100,
    singleEvents: true,
    orderBy: "startTime",
  };

  try {
    let events: any[] = [];
    let pageToken: any;
    do {
      const pagingParams: calendar_v3.Params$Resource$Events$List = {
        ...params,
        pageToken: pageToken,
      };
      const { data } = await calendarClient.events.list(pagingParams);
      const { nextPageToken, items } = data;
      pageToken = nextPageToken;
      events = events.concat(items);
    } while (!isEmpty(pageToken));

    const gCalEvents = flatten(events.map(GCalEvent.gen));
    return gCalEvents;
  } catch (e) {
    console.log(`calendarId(${calendarId}) has error`, e);
    throw e;
  }
};