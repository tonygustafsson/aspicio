'use strict';

const moment = require('moment');
const path = require('path');
const config = require('../config.json');

// ----------DB SETUP-----------//
const loki = require('lokijs');
const dbLocation = path.resolve(__dirname, `../${config.dbName}`);
const lokiDB = new loki(dbLocation);
var logTable = null;
var stateTable = null;

lokiDB.loadDatabase({}, () => {
    logTable = lokiDB.getCollection(config.dbLogTableName);
    stateTable = lokiDB.getCollection(config.dbStateTableName);

    if (logTable === null) {
        logTable = lokiDB.addCollection(config.dbLogTableName, { indices: ['level', 'time'] });
    }

    if (stateTable === null) {
        stateTable = lokiDB.addCollection(config.dbStateTableName, { indices: ['name'] });
    }
});
// -----------------------------//

let getIdFromName = name => {
    // ID is name in lowercase and numbers, spaces as - and nothng else
    name = name.toLowerCase();
    name = name.replace(/\s/g, '-');
    name = name.replace(/[^a-z\d\-]/g, '', name);

    return name;
};

let saveState = (name, url, serverIsUp, requestTime = 0, error) => {
    let newState = {
        name: name,
        id: getIdFromName(name),
        time: moment.now(),
        url: url,
        serverIsUp: serverIsUp,
        requestTime: requestTime
    };

    if (error) {
        newState.lastErrorTime = moment.now();
        newState.lastError = error;
    }

    if (stateTable) {
        let server = stateTable.findObject({
            name: name
        });

        if (server) {
            server.time = newState.time;
            server.serverIsUp = newState.serverIsUp;
            server.requestTime = newState.requestTime;

            if (error) {
                server.lastErrorTime = moment.now();
                server.lastError = error;
            }

            stateTable.update(server);
        } else {
            stateTable.insert(newState);
        }
    } else {
        console.error('Could not insert state!', newState);
    }

    lokiDB.saveDatabase(function (err) {
        if (err) console.error('error saving');
    });
};

let saveLog = (level = 'info', name, url, message, requestTime = 0) => {
    let newLog = {
        level: level,
        time: moment.now(),
        name: name,
        url: url,
        message: message,
        requestTime: requestTime
    };

    if (logTable) {
        logTable.insert(newLog);
    } else {
        console.error('Could not insert log!', newLog);
    }

    lokiDB.saveDatabase(function (err) {
        if (err) console.error('error saving');
    });
};

const db = {
    state: {
        save: (name, url, state, requestTime, error) => {
            saveState(name, url, state, requestTime, error);
        }
    },

    log: {
        info: (name, url, message, requestTime) => {
            saveLog('info', name, url, message, requestTime);
            console.log(`${moment().format('HH:mm:s')}: <${name}> ${message}`);
        },

        error: (name, url, message, requestTime) => {
            let red = '\x1b[31m',
                reset = '\x1b[0m';

            saveLog('error', name, url, message, requestTime);
            console.error(`${red}${moment().format('HH:mm:s')}: <${name}> ${message}${reset}`);
        }
    }
};

module.exports = db;
