const schedule = require('node-schedule');
const { exec } = require('child_process');

const cronSchedule = '*/10 * * * * *';

schedule.scheduleJob(cronSchedule, function() {
    exec('node monitor.js', (err, stdout) => {
        if (err) {
            console.error('Could not run monitor!');
        }

        console.log(stdout);
    });
});
