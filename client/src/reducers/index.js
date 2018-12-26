// @flow

import { combineReducers } from 'redux';
import { status, errors } from './status';
import { isOnline } from './connectivity';
import { isAuthenticated } from './auth';

export default combineReducers({
    status,
    errors,
    isOnline,
    isAuthenticated
});
