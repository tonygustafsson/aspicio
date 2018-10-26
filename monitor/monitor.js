'use strict';

const axios = require('axios');
const log = require('./inc/log');

const config = require('../config.json');

config.services.forEach(service => {
    axios({
        method: 'get',
        url: service.url,
        maxRedirects: 0,
        headers: {}
    })
        .then(response => {
            log.info(service.name, service.url, 'Server responded', 1000);
            return response.data;
        })
        .then(body => {
            if (!body.includes(service.findString)) {
                log.error(service.name, service.url, 'Could not find correct string', 1000);
                return;
            }

            log.info(service.name, service.url, 'Server responded with the correct content!', 1000);
        })
        .catch(error => {
            log.error(service.name, service.url, 'Could not connect!', 1000);
        });
});
