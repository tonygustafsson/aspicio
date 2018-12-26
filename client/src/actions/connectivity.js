// @flow

type navigorOnlineType = {
    type: string,
    payload: boolean
}

export const navigatorOnLine = (): navigorOnlineType => {
    return {
        type: 'NAVIGATOR_CONNECTIVITY',
        payload: navigator.onLine
    };
};

export const listenToWindowEvent = (name: string, mapEventToAction: function) => {
    return (dispatch: function) => {
        window.addEventListener(name, e => {
            dispatch(mapEventToAction(e));
        });
    };
};
