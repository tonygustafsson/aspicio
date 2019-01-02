// @flow

import socketContext from '../socketContext';
import type { ErrorType, ServicesType } from '../types';

type DataFromApiType = {
    errors?: Array<ErrorType>,
    status?: ServicesType
};

export function itemsFetchDataSuccess(data: DataFromApiType) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        status: data.status,
        errors: data.errors
    };
}

export function listenForNewData() {
    return (dispatch: Function) => {
        socketContext.on('NewData', (data: DataFromApiType) => {
            dispatch(itemsFetchDataSuccess(data));
        });
    };
}
