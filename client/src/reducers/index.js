import { combineReducers } from 'redux';
import { items, itemsHaveError, itemsAreLoading } from './status';

export default combineReducers({
    items,
    itemsHaveError,
    itemsAreLoading
});
