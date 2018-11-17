import { combineReducers } from 'redux';
import { data, itemsHaveError, itemsAreLoading } from './status';
import { toggleService } from './service';

export default combineReducers({
    data,
    itemsHaveError,
    itemsAreLoading,
    toggleService
});
