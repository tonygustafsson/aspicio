'use strict';

const moment = require('moment');
const fs = require('fs');

const log = {
    _log: (level = 'info', name, url, message, requestTime = 0) => {
        let logObj = {
            level: level,
            time: moment.now(),
            name: name,
            url: url,
            message: message,
            requestTime: requestTime
        };

        let fileName = `log/${level}/${moment().format('YYYY-WW')}.json`;

        fs.appendFile(fileName, '\n' + JSON.stringify(logObj), error => {
            if (error) console.error(error);
        });
    },

    info: (name, url, message, requestTime) => {
        log._log('info', name, url, message, requestTime);
        console.log(`${moment().format('HH:mm:s')}: <${name}> ${message}`);
    },

    error: (name, url, message, requestTime) => {
        let red = '\x1b[31m',
            reset = '\x1b[0m';

        log._log('error', name, url, message, requestTime);
        console.error(`${red}${moment().format('HH:mm:s')}: <${name}> ${message}${reset}`);
    }
};

module.exports = log;
