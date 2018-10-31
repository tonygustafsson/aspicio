const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const socket = require('socket.io');
app.use(cors());

const server = http.createServer(app);
const io = socket(server);

const path = require('path');
const loki = require('lokijs');
const dbLocation = path.resolve(__dirname, '../db.json');
const lokiDB = new loki(dbLocation);

let prevData = {},
    prevDataExists = () => Object.keys(prevData).length > 0,
    objectsAreIdentical = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

let getStatus = async () => {
    return new Promise((resolve, reject) => {
        try {
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
}, 1000);

io.listen(3001);
