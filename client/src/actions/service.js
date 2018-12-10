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

export function navigatorOnLine(e) {
    return {
        type: 'NAVIGATOR_CONNECTIVITY',
        payload: navigator.onLine
    };
}

export function listenToWindowEvent(name, mapEventToAction) {
    return dispatch => {
        window.addEventListener(name, e => {
            dispatch(mapEventToAction(e));
        });
    };
}
