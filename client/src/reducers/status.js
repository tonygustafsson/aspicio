// @flow

import type { DataFromApiType } from '../types';

type ActionType = {
    type: string,
    data: DataFromApiType
};

export function data(state: Array<any> = [], action: ActionType) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.data;

        default:
            return state;
    }
}
