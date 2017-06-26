# webmonitor
A curl web monitor and a nodejs web server to show server up/down.
It used bash and curl for checking the web pages, both that it delivers HTTP 200 (OK) and that the correct content is recieved.
It also have a nodejs express web server that will show a dashboard with all the webpages statuses. 

startJobs.sh is using webCheck.sh to check servers with curl. This is scheduled with a cron job.

Oh, and it has Slack support. It shouts out to a #channel when servers are down.
For this to work you need to edit webCheck.sh.

## Install debian packages
`sudo npm install nodejs npm`

## Install recommended packages (not needed)
`sudo npm install vim vsftpd git`

## Setup repository
`git clone https://github.com/tonygustafsson/webmonitor.git`

## Setup directories
`mkdir ~/webmonitor/log ~webmonitor/error ~webmonitor/status`

## Setup nodejs packages
`npm install ~/webmonitor/server`

## Setup scheduled jobs
`crontab -e`

And add the following:

`*/2 * * * * ~/webmonitor/startJobs.sh`

`@reboot nodejs ~/webmonitor/server/server.js`

## Directories
* /error: Everytime a webpages it not responding it will be logged here
* /log: All webpage checkups are logged here, even HTTP 200 (OK)
* /server: The nodejs server is stored here
* /status: The server up/down status and response time is stored in file names that the nodejs server can scan

