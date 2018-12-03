import socketContext from '../socketContext';

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

export function listenForNewData() {
    return dispatch => {
        socketContext.on('NewData', data => {
            dispatch(itemsFetchDataSuccess(data));
        });
    };
}
