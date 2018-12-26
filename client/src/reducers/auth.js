// @flow

export function isAuthenticated(state: boolean = false, action: Object) {
    switch (action.type) {
        case 'AUTHENTICATED_USER':
            return action.payload;
        default:
            return state;
    }
}
