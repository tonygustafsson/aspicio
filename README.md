# webmonitor

A curl web monitor and a nodejs web server to show server up/down.
It used bash and curl for checking the web pages, both that it delivers HTTP 200 (OK) and that the correct content is recieved.
It also have a nodejs express web server that will show a dashboard with all the webpages statuses.

monitor/startJobs.sh is using monitor/webCheck.sh to check servers with curl. This is scheduled with a cron job.

Oh, and it has Slack support. It shouts out to a #channel when servers are down.
For this to work you need to edit webCheck.sh.

## Dependencies

-   Linux (bash)
-   NodeJS
-   npm

## Setup repository

```
git clone https://github.com/tonygustafsson/webmonitor.git
```

## Setup nodejs packages

```
cd server
npm install
```

## Setup scheduled jobs

```
crontab -e
```

And add the following:

```
*/2 * * * * ~/Projects/webmonitor/monitor/startJobs.sh
@reboot nodejs ~/Projects/webmonitor/server/server.js
```

## Directories

-   /monitor: The curl monitor
-   /server: The nodejs server is stored here
-   /server/error: Everytime a webpages it not responding it will be logged here
-   /server/log: All webpage checkups are logged here, even HTTP 200 (OK)
-   /server/status: The server up/down status and response time is stored in file names that the nodejs server can scan
