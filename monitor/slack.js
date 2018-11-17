'use strict';

const axios = require('axios');
const config = require('../config.json');

let slack = {
    send(service, error) {
        let payload = `${service.name} (${service.url}): ${error}. <${config.clientUrl}|Click here> for more info.`;

        axios({
            method: 'post',
            url: config.slackHookUrl,
            headers: {},
            data: {
                username: config.slackUserName,
                text: payload,
                icon_emoji: config.slackIcon
            }
        }).catch(err => {
            console.log(`Slack error: ${err.response.data}`);
        });
    }
};

module.exports = slack;
