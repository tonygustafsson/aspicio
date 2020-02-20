// @flow

import socketContext from '../socketContext';

export function toggleServiceState(serviceId: string) {
    return {
        type: 'TOGGLE_SERVICE_STATE',
        serviceId: serviceId
    };
}

export function listenForServiceStateResponse() {
    return (dispatch: Function) => {
        socketContext.on('ToggleServiceStateSuccess', serviceId => {
            dispatch(toggleServiceState(serviceId));
        });
    };
}

export function sendServiceState(serviceId: string, pauseForNoOfMinutes: number) {
    return (dispatch: Function) => {
        socketContext.emit(
            'ToggleServiceState',
            { serviceId: serviceId, pauseForNoOfMinutes: pauseForNoOfMinutes },
            response => {
                dispatch(toggleServiceState(serviceId));
            }
        );
    };
}
