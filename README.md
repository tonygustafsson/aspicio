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

![Aspicio map](aspicio.png 'Aspicio map')

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

## Configuration

All configuration is done in ./config.json. Including:

-   The LokiDB filename, tables and indexes
-   The services to monitor with ports and addresses
-   Port that is used by server and client
-   Number of errors seen on client
-   Slack integration
-   How often stuff is done

## TODO

-   A scheduling for monitor
-   Separation for server and client so that client works from another network if needed
