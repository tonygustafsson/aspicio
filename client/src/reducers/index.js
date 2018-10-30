import { combineReducers } from 'redux';
import apiReducer from './apiReducer';

const reducers = combineReducers({
    api: apiReducer
});

export default reducers;
