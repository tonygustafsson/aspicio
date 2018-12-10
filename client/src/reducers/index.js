import { combineReducers } from 'redux';
import { data, itemsHaveError, itemsAreLoading } from './status';
import { toggleServiceState } from './service';
import { isOnline } from './connectivity';

export default combineReducers({
    data,
    itemsHaveError,
    itemsAreLoading,
    toggleServiceState,
    isOnline
});
