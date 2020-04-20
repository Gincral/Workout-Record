export default (state="", action) => {
    switch (action.type) {
        case 'USER_NAME':
            return action.payload;
        default:
            return state;
    }
};