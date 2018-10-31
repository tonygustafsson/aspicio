const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const socket = require('socket.io');
app.use(cors());

const config = require('../config.json');
const server = http.createServer(app);
const io = socket(server);

const path = require('path');
const loki = require('lokijs');
const dbLocation = path.resolve(__dirname, `../${config.dbName}`);
const lokiDB = new loki(dbLocation);

let prevData = {},
    prevDataExists = () => Object.keys(prevData).length > 0,
    objectsAreIdentical = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

let getStatus = async () => {
    return new Promise((resolve, reject) => {
        try {
            lokiDB.loadDatabase({}, () => {
                var stateTable = lokiDB.getCollection(config.dbStateTableName);

                if (stateTable === null) {
                    stateTable = lokiDB.addCollection(config.dbStateTableName, { indices: ['name'] });
                }

                let onlineServices = stateTable.find({
                    serverIsUp: true
                });

                let offlineServices = stateTable.find({
                    serverIsUp: false
                });

                let status = {
                    online: onlineServices,
                    offline: offlineServices
                };

                resolve(status);
            });
        } catch (error) {
            reject(error);
        }
    });
};

let getErrors = async () => {
    return new Promise((resolve, reject) => {
        try {
            lokiDB.loadDatabase({}, () => {
                var logTable = lokiDB.getCollection(config.dbLogTableName);

                if (logTable === null) {
                    logTable = lokiDB.addCollection(config.dbLogTableName, { indices: ['level', 'time'] });
                }

                let errors = logTable
                    .chain()
                    .find({
                        level: 'error'
                    })
                    .simplesort('time', true)
                    .limit(config.dbNoErrorsToGet)
                    .data();

                resolve(errors);
            });
        } catch (error) {
            reject(error);
        }
    });
};

io.on('connection', async socket => {
    console.log(`New client connected with ID ${socket.id}`);

    let data = {
        status: await getStatus(),
        errors: await getErrors()
    };

    socket.emit('NewData', data);

    socket.on('disconnect', () => console.log(`Client disconnected with ID ${socket.id}`));
});

setInterval(async () => {
    let data = {
        status: await getStatus(),
        errors: await getErrors()
    };

    if (prevDataExists() && objectsAreIdentical(data, prevData)) {
        // No changes, do not emit anything
        return;
    }

    console.log('Data has changed, emit to clients...');
    io.sockets.emit('NewData', data);
    prevData = data;
}, config.serverCheckForChangesMs);

io.listen(config.serverPort);
