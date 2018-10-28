'use strict';

const moment = require('moment');
const loki = require('lokijs');

var lokiDB = new loki('./db.json');
var logTable = null;
var stateTable = null;

lokiDB.loadDatabase({}, () => {
    logTable = lokiDB.getCollection('log');
    stateTable = lokiDB.getCollection('state');

    if (logTable === null) {
        logTable = lokiDB.addCollection('log', { indices: ['level', 'time'] });
    }

    if (stateTable === null) {
        stateTable = lokiDB.addCollection('state', { indices: ['name'] });
    }
});

let saveState = (name, url, state, requestTime = 0) => {
    let stateObj = {
        time: moment.now(),
        name: name,
        url: url,
        state: state,
        requestTime: requestTime
    };

    if (stateTable) {
        let server = stateTable.findObject({
            name: name
        });

        if (server) {
            server.time = stateObj.time;
            server.url = stateObj.url;
            server.state = stateObj.state;
            server.requestTime = stateObj.requestTime;

            stateTable.update(server);
        } else {
            stateTable.insert(stateObj);
        }
    } else {
        console.error('Could not insert state!', stateObj);
    }

    lokiDB.saveDatabase(function(err) {
        if (err) console.error('error saving');
    });
};

let saveLog = (level = 'info', name, url, message, requestTime = 0) => {
    let logObj = {
        level: level,
        time: moment.now(),
        name: name,
        url: url,
        message: message,
        requestTime: requestTime
    };

    if (logTable) {
        logTable.insert(logObj);
    } else {
        console.error('Could not insert log!', logObj);
    }

    lokiDB.saveDatabase(function(err) {
        if (err) console.error('error saving');
    });
};

const db = {
    state: {
        save: (name, url, state, requestTime) => {
            saveState(name, url, state, requestTime);
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
