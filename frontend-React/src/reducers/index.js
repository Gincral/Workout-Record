import { combineReducers } from 'redux';
import setTasksListReducer from './setTasksListReducer';
import setTodaysTaskListReducer from './setTodaysTaskListReducer';
import selectedTaskReducer from './selectedTaskReducer';
import setFinishedTasksListReducer from './setFinishedTasksListReducer';
import setUnfinishedTasksListRducer from './setUnfinishedTasksListReducer';
import updateLoginReducer from './updateLoginReducer';
import setUserIDReducer from './setUserIDReducer';
import setDayReducer from './setDayReducer';
import setUserNameReducer from './setUserNameReducer';
import deleteTasksListReducer from './deleteTasksListReducer';


export default combineReducers({
    tasksList: setTasksListReducer,
    todaysTasksList: setTodaysTaskListReducer,
    selectedTask: selectedTaskReducer,
    unfinishedTasksList: setUnfinishedTasksListRducer,
    finishedTasksList: setFinishedTasksListReducer,
    login: updateLoginReducer,
    userID: setUserIDReducer,
    userName: setUserNameReducer,
    day: setDayReducer,
    deleteTasksList: deleteTasksListReducer,
});
