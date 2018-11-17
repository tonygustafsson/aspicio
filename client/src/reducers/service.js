export function toggleService(state = false, action) {
    switch (action.type) {
        case 'TOGGLE_SERVICE':
            return action.serviceId;

        default:
            return state;
    }
}
