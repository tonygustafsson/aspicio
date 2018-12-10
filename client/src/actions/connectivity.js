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
