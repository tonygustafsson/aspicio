const schedule = require('node-schedule');
const { exec } = require('child_process');
const config = require('../config.json');

schedule.scheduleJob(config.monitorCheckServices, function() {
    exec('node monitor.js', (err, stdout) => {
        if (err) {
            console.error('Could not run monitor!');
        }

        console.log(stdout);
    });
});
