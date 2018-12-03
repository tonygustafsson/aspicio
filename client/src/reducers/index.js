import { combineReducers } from 'redux';
import { data, itemsHaveError, itemsAreLoading } from './status';
import { toggleServiceState } from './service';

export default combineReducers({
    data,
    itemsHaveError,
    itemsAreLoading,
    toggleServiceState
});
