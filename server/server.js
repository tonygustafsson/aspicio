const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const socket = require('socket.io');
const moment = require('moment');
const locale = require('moment/locale/sv');
moment.updateLocale('sv', locale);

app.use(cors());

const configPath = '../config.json';
let config = require(configPath);
const server = http.createServer(app);
const io = socket(server);

const fs = require('fs');
const path = require('path');
const loki = require('lokijs');
const dbLocation = path.resolve(__dirname, `../${config.dbName}`);
const lokiDB = new loki(dbLocation);

const mergeStateWithConfig = service => {
    var configService = config.services.find(confService => {
        return confService.name === service.name;
    });

    service.description = configService.description;

    if (typeof configService.enabled === 'number' && moment(configService.enabled).isBefore(moment.now())) {
        // Enabled in the future, enable if time has passed
        configService.enabled = true;
        saveConfig(config);
        console.log('Enabling service after pause: ' + service.name + '!');
    }

    service.enabled = configService.enabled;

    return service;
};

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

                onlineServices.map(mergeStateWithConfig);
                offlineServices.map(mergeStateWithConfig);

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

let saveConfig = config => {
    fs.writeFile(configPath, JSON.stringify(config, null, 4), 'utf8', () => {
        config = config;
    });
};

io.on('connection', async socket => {
    console.log(`New client connected with ID ${socket.id}`);

    let data = {
        status: await getStatus(),
        errors: await getErrors()
    };

    socket.emit('NewData', data);

    socket.on('ToggleServiceState', data => {
        var configService = config.services.find(confService => {
            return confService.name === data.serviceId;
        });

        configService.enabled = !configService.enabled;
        saveConfig(config);

        console.log('ToggleServiceState: ' + configService.name);
        socket.emit('ToggleServiceStateSuccess', data.serviceId);
    });

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
