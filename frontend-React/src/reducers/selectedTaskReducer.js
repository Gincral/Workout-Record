export default (state={}, action) => {
    switch (action.type) {
        case 'SELECTED_TASK':
            return action.payload;
        default:
            return state;
    }
};
