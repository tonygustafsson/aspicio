'use strict';

const axios = require('axios');

const config = require('../config.json');

config.services.forEach(service => {
    axios({
        method: 'get',
        url: service.url,
        maxRedirects: 0,
        headers: {}
    })
        .then(response => {
            console.log(`${service.name}: Server responded`);
            return response.data;
        })
        .then(body => {
            if (!body.includes(service.findString)) {
                console.error(`${service.name}: Could not find correct string`);
                return;
            }

            console.log(`${service.name}: Server is up!`);
        })
        .catch(error => {
            console.error(error.message);
        });
});
