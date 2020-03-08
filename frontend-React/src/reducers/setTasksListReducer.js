export default (state=[], action) => {
    switch (action.type) {
        case 'TASKSLIST':
            return action.payload;
        default:
            return state;
    }
};
