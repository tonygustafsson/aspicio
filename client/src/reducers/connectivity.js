export function isOnline(state = false, action) {
    switch (action.type) {
        case 'NAVIGATOR_CONNECTIVITY':
            return action.payload;
        default:
            return state;
    }
}
