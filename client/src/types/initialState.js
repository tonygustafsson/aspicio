// @flow

import type { DataFromApiType } from '.';

export type InitialStateType = {
    isAuthenticated: boolean,
    isOnline: boolean,
    data: DataFromApiType
};
