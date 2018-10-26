'use strict';

const moment = require('moment');
const loki = require('lokijs');

var db = new loki('./log/log.json');
var logTable = null;

db.loadDatabase({}, () => {
    logTable = db.getCollection('log');

    if (logTable === null) {
        logTable = db.addCollection('log', { indices: ['level', 'time'] });
    }
});

let logToDb = (level = 'info', name, url, message, requestTime = 0) => {
    let logObj = {
        level: level,
        time: moment.now(),
        name: name,
        url: url,
        message: message,
        requestTime: requestTime
    };

    logTable.insert(logObj);

    db.saveDatabase(function(err) {
        if (err) console.error('error saving');
    });
};

const log = {
    info: (name, url, message, requestTime) => {
        logToDb('info', name, url, message, requestTime);
        console.log(`${moment().format('HH:mm:s')}: <${name}> ${message}`);
    },

    error: (name, url, message, requestTime) => {
        let red = '\x1b[31m',
            reset = '\x1b[0m';

        logToDb('error', name, url, message, requestTime);
        console.error(`${red}${moment().format('HH:mm:s')}: <${name}> ${message}${reset}`);
    }
};

module.exports = log;
