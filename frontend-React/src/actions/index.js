export const setTasksList = (list) => ({
    type: 'TASKSLIST',
    payload: list,
});

export const setTodaysTasksList = (list) => ({
    type: 'TODAYSTASKSLIST',
    payload: list,
});

export const selectingTask = (task) => ({
    type: 'SELECTED_TASK',
    payload: task,
});