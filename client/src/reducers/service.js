// @flow

type ActionType = {
    type: string,
    serviceId: string
};

export function toggleServiceState(state: boolean = false, action: ActionType) {
    switch (action.type) {
        case 'TOGGLE_SERVICE_STATE':
            return action.serviceId;
        default:
            return state;
    }
}
