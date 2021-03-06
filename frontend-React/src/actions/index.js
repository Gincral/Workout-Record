export const setTasksList = (list) => ({
    type: 'TASKSLIST',
    payload: list,
});

export const setTodaysTasksList = (list) => ({
    type: 'TODAYS_TASKSLIST',
    payload: list,
});

export const setUnfinishedTasksList = (list) => ({
    type: 'UNFINISHED_TASKSLIST',
    payload: list,
});

export const setFinishedTasksList = (list) => ({
    type: 'FINISHED_TASKSLIST',
    payload: list,
});

export const selectingTask = (task) => ({
    type: 'SELECTED_TASK',
    payload: task,
});

export const updateLogin = (bool) =>({
    type: 'LOGIN',
    payload: bool,
});

export const setUserLogin = (login) =>({
    type: 'USER_ID',
    payload: login,
});

export const setUserName = (username) =>({
    type: 'USER_NAME',
    payload: username,
});

export const setDay = (day) =>({
    type: 'DAY',
    payload: day,
});

export const deleteTask = (list) =>({
    type: 'DELETE_TASK',
    payload: list,
});