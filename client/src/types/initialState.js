// @flow

import type { ServicesType, ErrorType } from '.';

export type InitialStateType = {
    isAuthenticated: boolean,
    isOnline: boolean,
    status: ServicesType,
    errors: Array<ErrorType>
};
