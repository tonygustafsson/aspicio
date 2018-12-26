// @flow

type Action = {
    type: string,
    payload: boolean
};

export const isOnline = (state: boolean = false, action: Action) => {
    switch (action.type) {
        case 'NAVIGATOR_CONNECTIVITY':
            return action.payload;
        default:
            return state;
    }
};
