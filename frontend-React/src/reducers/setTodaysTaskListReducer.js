export default (state=[], action) => {
    switch (action.type) {
        case 'TODAYSTASKSLIST':
            return action.payload;
        default:
            return state;
    }
};
