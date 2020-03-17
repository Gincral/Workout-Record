export default (state=[], action) => {
    switch (action.type) {
        case 'FINISHED_TASKSLIST':
            return action.payload;
        default:
            return state;
    }
};
