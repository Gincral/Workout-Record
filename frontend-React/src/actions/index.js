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

export const ifUpdate = (bool) =>({
    type: 'UPDATE',
    payload: bool,
});

export const updateLogin = (bool) =>({
    type: 'LOGIN',
    payload: bool,
});