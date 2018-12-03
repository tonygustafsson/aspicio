import socketContext from '../socketContext';

export function toggleServiceState(serviceId) {
    return {
        type: 'TOGGLE_SERVICE_STATE',
        serviceId: serviceId
    };
}

export function sendServiceState(serviceId) {
    return dispatch => {
        socketContext.emit('ToggleServiceState', { serviceId: serviceId }, response => {
            console.log('Svar: ' + response);
            dispatch(toggleServiceState(serviceId));
        });
    };
}
