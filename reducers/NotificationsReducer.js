const NotificationsReducer = (state={}, action) => {
    switch(action.type) {
        case 'NEW_NOTIFICATION':
            return { expoToken: action.payload };
        default: return state;
    }
}

export default NotificationsReducer;