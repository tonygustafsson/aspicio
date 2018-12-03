'use strict';

const axios = require('axios');
const moment = require('moment');

const db = require('./db');
const slack = require('./slack');
const config = require('../config.json');

axios.interceptors.request.use(config => {
    config.requestStartTime = moment().valueOf();
    return config;
});

axios.interceptors.response.use(response => {
    response.requestEndTime = moment().valueOf();
    return response;
});

config.services.forEach(service => {
    if (!service.enabled) return;

    axios({
        method: 'get',
        url: service.url,
        maxRedirects: 0,
        headers: {}
    })
        .then(response => {
            let requestTime = response.requestEndTime - response.config.requestStartTime;

            if (!response.data.includes(service.findString)) {
                let errorMsg = `Could not find correct string: ${service.findString}`;

                db.log.error(service.name, service.url, errorMsg, requestTime);
                db.state.save(service.name, service.url, false, requestTime, errorMsg);
                slack.send(service, errorMsg);

                return;
            }

            db.log.info(service.name, service.url, 'Server responded with the correct content!', requestTime);
            db.state.save(service.name, service.url, true, requestTime);
        })
        .catch(error => {
            let errorMsg = `Could not connect: ${error.message}`;

            db.log.error(service.name, service.url, errorMsg);
            db.state.save(service.name, service.url, false, 0, errorMsg);
            slack.send(service, errorMsg);
        });
});
