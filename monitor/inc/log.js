'use strict';

const moment = require('moment');
const fs = require('fs');

const log = {
    _log: (level, name, url, message, loadTime) => {
        let logObj = {
            level: level,
            time: moment.now(),
            name: name,
            url: url,
            message: message,
            loadTime: loadTime
        };

        let fileName = `log/${level}/${moment().format('YYYY-WW')}.json`;

        fs.appendFile(fileName, '\n' + JSON.stringify(logObj), error => {
            if (error) console.error(error);
        });
    },

    info: (name, url, message, loadTime) => {
        log._log('info', name, url, message, loadTime);
        console.log(`${moment().format('HH:mm:s')}: ${message}`);
    },

    error: (name, url, message, loadTime) => {
        let red = '\x1b[31m',
            reset = '\x1b[0m';

        log._log('error', name, url, message, loadTime);
        console.error(`${red}${moment().format('HH:mm:s')}: ${message}${reset}`);
    }
};

module.exports = log;
