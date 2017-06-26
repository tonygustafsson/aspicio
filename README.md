# webmonitor
A curl web monitor and a nodejs web server to show server up/down

## Install debian packages
`sudo npm install nodejs npm`

## Install recommended packages (not needed)
`sudo npm install vim vsftpd git`

## Setup repository
`git clone https://github.com/tonygustafsson/webmonitor.git`

## Setup directories
`mkdir ~/webmonitor/log ~webmonitor/error ~webmonitor/status`

## Setup nodejs
`npm install ~/webmonitor/server`

## Setup scheduled jobs
`crontab -e`

And add the following:
`*/2 * * * * ~/webmonitor/startJobs.sh
@reboot nodejs ~/webmonitor/server/server.js`

