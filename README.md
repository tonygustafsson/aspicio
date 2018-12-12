# aspicio

A NodeJS / React web monitor that alerts operators when services are down.

It has three parts:

-   Monitor: Checks services through axios HTTP/HTTPS and saves state to DB using LokiDB.
-   Server: NodeJS web server that goes through the database and sends alerts with web sockets to client.
-   Client: A React with Redux that recieves updates from the server.

Oh, and it has Slack support. It shouts out to a #channel when servers are down as well.
And it's a Progressive Web App, which means that operators can get alerts in their mobile devices.
It's also equipped to be used as a dashboard on a TV or tablet somewhere.

It works on Linux, MacOS and Windows.

## Screenshot

![Aspicio screenshot](aspicio-screenshot.png 'Aspicio screenshot')

## Map

![Aspicio map](aspicio-map.png 'Aspicio map')

## Dependencies

-   NodeJS

## Setup repository

```
git clone https://github.com/tonygustafsson/aspicio.git
```

## Start web monitor

```
cd monitor
npm install
npm start
```

## Schedule web monitor

The is no real value to run this just once. You can schedule how often the monitor should run
by changing the cron time in ./config.json. Then just run:

```
node scheduler.js
```

## Start web server

```
cd server
npm install
npm start
```

## Start web client

```
cd client
npm install
npm start
```

## Authenticate

No real authentication exists yet. To prevent from displaying sensitive information to the wrong person,
you can set your token which a localStorage variable must match. The token is included in the client
source code so this is in no way secure.

Change the constants in ./client/src/constants/token.js. To be able to view the client you'll
need to add a localStorage item named AspicioToken with this token in it. Leave the token empty to
allow all.

## Configuration

All configuration is done in ./config.json.

-   services: An array with service objects
    -   name: The display name of the service
    -   url: The URL to check against, could include a network port. HTTP and HTTPS supported.
    -   findString: A string to look for in the HTML response to verify that the site is really up.
    -   description: A longer description for the client
    -   enabled: If false it will be checked and the client will show the service as paused.
-   dbName: The JSON database name.
-   dbLogTableName: The table name for logs, including log/warning/error. No need to change this.
-   dbStateTableName: The table name for states for each service. No need to change this.
-   dbNoErrosToGet: How many errors to display on the client.
-   serverPort: The server port. The client must match this to be able to communicate.
-   serverCheckForChangesMs: How often the server should look at the output from the monitor. It will not push to clients if no change is made so this can be low. In milliseconds.
-   monitorCheckServices: How often the monitor will check the services, in cron format.
-   clientUrl: The URL to the client, including port.
-   slackEnabled: Boolean. Use Slack integration or not.
-   slackHookUrl: The Hook URL to be able to communicate and authenticate to Slack.
-   slackUserName: The username that is showed in Slack.
-   slackIcon: The icon for the username that is showed in Slack.
