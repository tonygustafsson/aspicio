// @flow

import socketContext from '../socketContext';
import type { DataFromApiType } from '../types'

export function itemsFetchDataSuccess(data: DataFromApiType) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        data
    };
}

export function listenForNewData() {
    return (dispatch: function) => {
        socketContext.on('NewData', (data: DataFromApiType) => {
            dispatch(itemsFetchDataSuccess(data));
        });
    };
}
