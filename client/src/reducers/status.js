// @flow

import type { ServicesType, ErrorType } from '../types';

type ActionStatusType = {
    type: string,
    status: ServicesType
};

type ActionErrorsType = {
    type: string,
    errors: Array<ErrorType>
};

export function status(state: Array<any> = [], action: ActionStatusType) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.status;
        default:
            return state;
    }
}

export function errors(state: Array<any> = [], action: ActionErrorsType) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.errors;

        default:
            return state;
    }
}
