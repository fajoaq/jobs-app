const AuthReducer = (state, action) => {
    switch(action.type) {
        case 'FACEBOOK_LOGIN_SUCCESS':
            return { token: action.payload };
        case 'FACEBOOK_LOGIN_FAIL':
            return { token: undefined};
        case 'testing':
            return { token: action.payload};
        default: return state;
    }
}

export default AuthReducer;