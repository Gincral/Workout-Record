export default (state=[], action) => {
    switch (action.type) {
        case 'TODAYS_TASKSLIST':
            return action.payload;
        default:
            return state;
    }
};
