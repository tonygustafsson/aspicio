const express = require('express');
const app = express();
const path = require('path');
const loki = require('lokijs');
const dbLocation = path.resolve(__dirname, '../db.json');
const lokiDB = new loki(dbLocation);

app.get('/get-status', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    lokiDB.loadDatabase({}, () => {
        var stateTable = lokiDB.getCollection('state');

        if (stateTable === null) {
            stateTable = lokiDB.addCollection('state', { indices: ['name'] });
        }

        let onlineServices = stateTable.find({
            serverIsUp: true
        });

        let offlineServices = stateTable.find({
            serverIsUp: false
        });

        let response = {
            onlineServices,
            offlineServices
        };

        res.send(JSON.stringify(response));
    });
});

app.get('/get-error', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    lokiDB.loadDatabase({}, () => {
        var logTable = lokiDB.getCollection('log');

        if (logTable === null) {
            logTable = lokiDB.addCollection('log', { indices: ['level', 'time'] });
        }

        let errors = logTable
            .chain()
            .find({
                level: 'error'
            })
            .simplesort('time')
            .limit(25)
            .data();

        let response = {
            errors
        };

        res.send(JSON.stringify(response));
    });
});

app.listen(3001, function() {
    console.log('Starting web server');
});
