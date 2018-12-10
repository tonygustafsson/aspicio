export function toggleServiceState(state = false, action) {
    switch (action.type) {
        case 'TOGGLE_SERVICE_STATE':
            return action.serviceId;
        default:
            return state;
    }
}

export function isOnline(state = false, action) {
    switch (action.type) {
        case 'NAVIGATOR_CONNECTIVITY':
            return action.payload;
        default:
            return state;
    }
}
