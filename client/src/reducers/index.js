import { combineReducers } from 'redux';
import { data } from './status';
import { toggleServiceState } from './service';
import { isOnline } from './connectivity';
import { isAuthenticated } from './auth';

export default combineReducers({
    data,
    toggleServiceState,
    isOnline,
    isAuthenticated
});
