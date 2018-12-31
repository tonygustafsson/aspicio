// @flow

import type { ErrorType } from '.';

export type ServiceType = {
    description: string,
    enabled: boolean,
    id: string,
    requestTime: number,
    name: string,
    serverIsUp: boolean,
    time: number,
    url: string,
    lastError: string,
    lastErrorTime: number
};

export type ServicesType = {
    online: Array<ServiceType>,
    offline: Array<ServiceType>
};
