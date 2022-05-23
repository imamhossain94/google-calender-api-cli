# google-calender-api-cli

## Shortcuts
* <a href="https://console.cloud.google.com/">Google cloud console</a>
* <a href="https://console.cloud.google.com/apis?">APIs & Services</a>
* <a href="https://calendar.google.com/calendar/">Google Calender</a>
* <a href="https://github.com/imammasleap/google-calender-api-cli">Git Repo Link</a>

## Installation
```
git clone git@github.com:imammasleap/google-calender-api-cli.git
cd google-calender-api-cli
npm install or npm install --force
```

## Get Credentials

1) Create a new project into the <a href="https://console.cloud.google.com/">Google cloud console</a>

* Select or create a new project.
* Click in APIs & Services. <a href="https://console.cloud.google.com/apis?">link</a>
* Click in OAuth consent screen and create an app with test users. <a href="https://console.cloud.google.com/apis/credentials?">link</a>
* Click in Credentials then Create an ``OAuth client ID`` with ``Application type`` = ``Desktop App``.
* Download the json file or copy the ``Client ID`` and ``Client secret``.

## Set Credentials in app

1) Go to ``src:\config.ts``.
* Replace ``YOUR_CLIENT_ID`` with ``<YOUR_PROJECTS_CLIENT_ID>>``
* Replace ``YOUR_CLIENT_SECRET`` with ``<YOUR_PROJECTS_CLIENT_SECRET>>``

## First Time Setup
1) Google Authentication
```commandline
npm run gcal start
```
Example:
```text
https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events&response_type=code&client_id=1091527423729-gq21lhr6tec2e4um6i8pgk41v5ept2md.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost
? Enter the code from that page here: 
```
2) Click on the link shows into the terminal. After authorizing copy the texts between ``?code=`` and ``&scope``.
```text
http://localhost/?code=4/0AX4XfWgVfq4oBRJcuWMDKZsOiiyGd_E_oNmGhw7BTbiqOPicf9czHhYUWsbuDdZ2hB4eLA&scope=https://www.googleapis.com/auth/calendar.events%20https://www.googleapis.com/auth/calendar
```

3) Paste the copied link into the terminal.
```text
? Enter the code from that page here: 4/0AX4XfWgVfq4oBRJcuWMDKZsOiiyGd_E_oNmGhw7BTbiqOPicf9czHhYUWsbuDdZ2hB4eLA

{
  access_token: 'ya29.a0ARrdaM8mibHrbsY9sHAVdg7n1Hpj8jQeehtoAFoTggkzzDmjEE_V4VMyD2Tnpnl6lvNuI80YHjeL-l6Kajpb-vA7d2ruFPOt3mf7HhG_keS89FVXaz88Us6Bl-Qnclu3pjkGsQxf6MreDEX3CCn6I-xnQHSg',
  refresh_token: '1//0gqTdv5grMgOMCgYIARAAGBASNwF-L9IrexsX5txxsvwAYA0Mab1VyimNPGlyf2XRdmVrlALz_VslYIZL92cB-WM03RKey20IaKo',
  scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar',
  token_type: 'Bearer',
  expiry_date: 1653313707441
}
✅ You are ready to go!
✅ Calender client connected!
✅ Calender client ready!
✅ Calender events are ready!
☑️
Summary: Test Event
CalendarId: softengr1.masleap@gmail.com
☑️
Summary: Second Test Event
CalendarId: softengr1.masleap@gmail.com
☑️
Summary: Final Test Event
CalendarId: softengr1.masleap@gmail.com
```

## Get Events list
Events list command
```commandline
npm run gcal events
```
Example:
```text
> src@1.0.0 gcal
> ts-node src/index.ts "events"

✅ You are ready to go!
✅ Calender client connected!
✅ Calender client ready!
✅ Calender events are ready!
☑️
Summary: Test Event
CalendarId: softengr1.masleap@gmail.com
☑️
Summary: Second Test Event
CalendarId: softengr1.masleap@gmail.com
☑️
Summary: Final Test Event
CalendarId: softengr1.masleap@gmail.com
```

## Insert an Event
Event inserting command
```commandline
npm run gcal insert "hello world" --form="xyz"  --to="pqr"
```
Example:
```text
> src@1.0.0 gcal
> ts-node src/index.ts "insert" "hello world" "xyz"

? Are you sure to insert this event into calendar? Yes
✅ Event is inserted
```

