// @flow

const constants = require('../constants');

export function authenticatedUser(status: boolean) {
    return {
        type: 'AUTHENTICATED_USER',
        payload: status
    };
}

export function isAuthenticated() {
    return (dispatch: function) => {
        var authToken = window.localStorage.getItem(constants.TOKEN.authTokenName);

        if (authToken && authToken === constants.TOKEN.authToken) {
            // Auth if token matches constant
            dispatch(authenticatedUser(true));
        } else if (!authToken && constants.TOKEN.authToken === '') {
            // Auth everyone if authToken is empty
            dispatch(authenticatedUser(true));
        } else {
            // Do not auth, prevent from viewing client
            dispatch(authenticatedUser(false));
        }
    };
}
