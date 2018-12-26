// @flow

import { combineReducers } from 'redux';
import { data } from './status';
import { isOnline } from './connectivity';
import { isAuthenticated } from './auth';

export default combineReducers({
    data,
    isOnline,
    isAuthenticated
});
