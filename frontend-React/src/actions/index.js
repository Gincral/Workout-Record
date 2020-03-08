export const setTasksList = (list) => ({
    type: 'TASKSLIST',
    payload: list,
});

export const setTodaysTasksList = (list) => ({
    type: 'TODAYSTASKSLIST',
    payload: list,
});