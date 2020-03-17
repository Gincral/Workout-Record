export default (state=[], action) => {
    switch (action.type) {
        case 'UNFINISHED_TASKSLIST':
            return action.payload;
        default:
            return state;
    }
};
