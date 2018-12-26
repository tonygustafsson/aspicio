// Copies configuration from ../config.json to environment variables
// To be able to access config outside of /src

const fs = require('fs');
const config = require('../config.json');

const fileOutput = `REACT_APP_SERVER_SOCKET_URL=${config.serverSocketUrl}`;

fs.writeFileSync('.env', fileOutput);
