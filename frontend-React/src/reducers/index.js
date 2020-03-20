import { combineReducers } from 'redux';
import setTasksListReducer from './setTasksListReducer';
import setTodaysTaskListReducer from './setTodaysTaskListReducer';
import selectedTaskReducer from './selectedTaskReducer';
import setFinishedTasksListReducer from './setFinishedTasksListReducer';
import setUnfinishedTasksListRducer from './setUnfinishedTasksListReducer';
import updateReducer from './updateReducer';
import updateLoginReducer from './updateLoginReducer';

export default combineReducers({
    tasksList: setTasksListReducer,
    todaysTasksList: setTodaysTaskListReducer,
    selectedTask: selectedTaskReducer,
    unfinishedTasksList: setUnfinishedTasksListRducer,
    finishedTasksList: setFinishedTasksListReducer,
    update: updateReducer,
    login: updateLoginReducer,
});
