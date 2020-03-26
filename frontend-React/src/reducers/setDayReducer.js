export default (state=0, action) => {
    switch (action.type) {
        case 'DAY':
            return action.payload;
        default:
            return state;
    }
};
