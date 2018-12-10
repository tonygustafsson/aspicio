import { combineReducers } from 'redux';
import { data, itemsHaveError, itemsAreLoading } from './status';
import { toggleServiceState, isOnline } from './service';

export default combineReducers({
    data,
    itemsHaveError,
    itemsAreLoading,
    toggleServiceState,
    isOnline
});
