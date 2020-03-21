import { combineReducers } from 'redux';
import setTasksListReducer from './setTasksListReducer';
import setTodaysTaskListReducer from './setTodaysTaskListReducer';
import selectedTaskReducer from './selectedTaskReducer';
import setFinishedTasksListReducer from './setFinishedTasksListReducer';
import setUnfinishedTasksListRducer from './setUnfinishedTasksListReducer';
import updateLoginReducer from './updateLoginReducer';
import setUserLoginReducer from './setUserLoginReducer';

export default combineReducers({
    tasksList: setTasksListReducer,
    todaysTasksList: setTodaysTaskListReducer,
    selectedTask: selectedTaskReducer,
    unfinishedTasksList: setUnfinishedTasksListRducer,
    finishedTasksList: setFinishedTasksListReducer,
    login: updateLoginReducer,
    userLogin: setUserLoginReducer,
});
