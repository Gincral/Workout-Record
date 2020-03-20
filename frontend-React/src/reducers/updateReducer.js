export default (state=false, action) => {
    switch (action.type) {
        case 'UPDATE':
            return action.payload;
        default:
            return state;
    }
};
