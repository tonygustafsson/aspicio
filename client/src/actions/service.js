import socketContext from '../socketContext';

export function toggleServiceState(serviceId) {
    return {
        type: 'TOGGLE_SERVICE_STATE',
        serviceId: serviceId
    };
}

export function listenForServiceStateResponse() {
    return dispatch => {
        socketContext.on('ToggleServiceStateSuccess', serviceId => {
            dispatch(toggleServiceState(serviceId));
        });
    };
}

export function sendServiceState(serviceId) {
    return dispatch => {
        socketContext.emit('ToggleServiceState', { serviceId: serviceId }, response => {
            dispatch(toggleServiceState(serviceId));
        });
    };
}
