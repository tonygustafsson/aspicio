'use strict';

const axios = require('axios');
const moment = require('moment');
const log = require('./inc/log');

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
    axios({
        method: 'get',
        url: service.url,
        maxRedirects: 0,
        headers: {}
    })
        .then(response => {
            let requestTime = response.requestEndTime - response.config.requestStartTime;
            log.info(service.name, service.url, 'Server responded', requestTime);

            if (!response.data.includes(service.findString)) {
                log.error(service.name, service.url, 'Could not find correct string', requestTime);
                return;
            }

            log.info(service.name, service.url, 'Server responded with the correct content!', requestTime);
        })
        .catch(error => {
            log.error(service.name, service.url, 'Could not connect!');
        });
});
