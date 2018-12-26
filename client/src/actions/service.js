// @flow

import socketContext from '../socketContext';

export function toggleServiceState(serviceId: string) {
    return {
        type: 'TOGGLE_SERVICE_STATE',
        serviceId: serviceId
    };
}

export function listenForServiceStateResponse() {
    return (dispatch: function) => {
        socketContext.on('ToggleServiceStateSuccess', serviceId => {
            dispatch(toggleServiceState(serviceId));
        });
    };
}

export function sendServiceState(serviceId: string) {
    return (dispatch: function) => {
        socketContext.emit('ToggleServiceState', { serviceId: serviceId }, response => {
            dispatch(toggleServiceState(serviceId));
        });
    };
}
