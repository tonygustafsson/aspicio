// @flow

import type { StatusesType, ErrorType } from '.';

export type InitialStateType = {
    isAuthenticated: boolean,
    isOnline: boolean,
    status: StatusesType,
    errors: Array<ErrorType>
};
