const constants = require('../constants');

export function authenticatedUser(status) {
    return {
        type: 'AUTHENTICATED_USER',
        payload: status
    };
}

export function isAuthenticated() {
    return dispatch => {
        var authToken = window.localStorage.getItem('AspicioToken');

        if (authToken && authToken === constants.TOKEN.auth) {
            dispatch(authenticatedUser(true));
        } else {
            dispatch(authenticatedUser(false));
        }
    };
}
