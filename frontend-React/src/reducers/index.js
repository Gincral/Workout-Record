import { combineReducers } from 'redux';
import setTasksListReducer from './setTasksListReducer';
import setTodaysTaskListReducer from './setTodaysTaskListReducer';
import selectedTaskReducer from './selectedTaskReducer';

export default combineReducers({
    tasksList: setTasksListReducer,
    todaysTaskList: setTodaysTaskListReducer,
    selectedTask: selectedTaskReducer,
});
