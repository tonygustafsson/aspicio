import socketIOClient from 'socket.io-client';

const apiUrl = 'http://localhost:3001/';
const socket = socketIOClient(apiUrl);

export function itemsHaveError(bool) {
    return {
        type: 'ITEMS_HAVE_ERROR',
        hasError: bool
    };
}

export function itemsAreLoading(bool) {
    return {
        type: 'ITEMS_ARE_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(data) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        data
    };
}

export function itemsFetchData() {
    return dispatch => {
        dispatch(itemsAreLoading(true));

        socket.on('NewData', data => {
            dispatch(itemsAreLoading(true));
            dispatch(itemsFetchDataSuccess(data));
            dispatch(itemsAreLoading(false));
        });
    };
}
