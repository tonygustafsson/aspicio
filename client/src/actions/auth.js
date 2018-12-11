const constants = require('../constants');

export function authenticatedUser(status) {
    return {
        type: 'AUTHENTICATED_USER',
        payload: status
    };
}

export function isAuthenticated() {
    return dispatch => {
        var authToken = window.localStorage.getItem(constants.TOKEN.authTokenName);

        if (authToken && authToken === constants.TOKEN.authToken) {
            dispatch(authenticatedUser(true));
        } else {
            dispatch(authenticatedUser(false));
        }
    };
}
