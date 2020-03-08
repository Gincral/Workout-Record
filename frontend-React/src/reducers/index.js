import { combineReducers } from 'redux';
import setTasksListReducer from './setTasksListReducer';
import setTodaysTaskListReducer from './setTodaysTaskListReducer';

export default combineReducers({
    tasksList: setTasksListReducer,
    todaysTaskList: setTodaysTaskListReducer,
});
