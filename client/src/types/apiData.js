// @flow

export type ErrorType = {
    level: string,
    message: string,
    name: string,
    requestTime: number,
    time: number,
    url: string
};

export type StatusType = {
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

export type StatusesType = {
    online: Array<StatusType>,
    offline: Array<StatusType>
};

export type DataFromApiType = {
    errors?: Array<ErrorType>,
    status?: StatusesType
};
