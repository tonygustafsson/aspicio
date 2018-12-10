export function isAuthenticated(state = false, action) {
    switch (action.type) {
        case 'AUTHENTICATED_USER':
            return action.payload;
        default:
            return state;
    }
}
