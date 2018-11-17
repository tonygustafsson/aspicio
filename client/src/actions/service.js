import socketContext from '../socketContext';

export function toggleService(serviceId) {
    return {
        type: 'TOGGLE_SERVICE',
        serviceId: serviceId
    };
}

export function pushToggleService(serviceId) {
    return dispatch => {
        socketContext.emit('ToggleService', { serviceId: serviceId }, response => {
            console.log('Svar: ' + response);
            dispatch(toggleService(serviceId));
        });
    };
}
