import { combineReducers } from 'redux';
import { data, itemsHaveError, itemsAreLoading } from './status';

export default combineReducers({
    data,
    itemsHaveError,
    itemsAreLoading
});
