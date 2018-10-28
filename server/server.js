const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// ----------DB SETUP-----------//
const loki = require('lokijs');
var dbLocation = path.resolve(__dirname, '../db.json');
var lokiDB = new loki(dbLocation);
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
// -----------------------------//

app.get('/get-status', function(req, res) {
    let onlineServices = stateTable.find({
        serverIsUp: { $eq: true }
    });

    let offlineServices = stateTable.find({
        serverIsUp: { $eq: false }
    });

    let response = {
        onlineServices,
        offlineServices
    };

    res.send(JSON.stringify(response));
});

app.get('/get-error', function(req, res) {
    var errors = [],
        dir = '/home/pi/webmonitor/error/',
        files = fs.readdirSync(dir);

    files
        .sort(function(a, b) {
            return fs.statSync(dir + a).mtime.getTime() - fs.statSync(dir + b).mtime.getTime();
        })
        .slice(Math.max(files.length - 5, 1));

    files.reverse().forEach(function(file) {
        var fileInfo = fs.readFileSync(dir + file, 'utf8');
        var content = fileInfo.split('\n').reverse();
        var errorsFromThisFile = { errorFileName: file.replace('.csv', ''), errors: [] };

        content.forEach(function(row) {
            if (row === '') return;

            var rowInfo = row.split(';');

            var error = {
                time: rowInfo[0],
                message: rowInfo[2],
                monitorName: rowInfo[3],
                url: rowInfo[4],
                responseTime: rowInfo[5]
            };

            errorsFromThisFile.errors.push(error);
        });

        errors.push(errorsFromThisFile);
    });

    res.send(JSON.stringify(errors));
});

app.listen(3000, function() {
    console.log('Starting web server');
});
