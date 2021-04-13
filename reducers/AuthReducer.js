const AuthReducer = (state, action) => {
    switch(action.type) {
        case 'FACEBOOK_LOGIN_SUCCESS':
            return { result: 'SUCCESS!'};
        case 'FACEBOOK_LOGIN_FAIL':
            return { result: 'FAIL!'};
        case 'testing':
            return { result: 'SUCCESS!'};
        default: return state;
    }
}

export default AuthReducer;