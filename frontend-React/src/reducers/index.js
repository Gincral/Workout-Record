import { combineReducers } from 'redux';
import setTasksListReducer from './setTasksListReducer';

export default combineReducers({
    tasksList: setTasksListReducer,
});
