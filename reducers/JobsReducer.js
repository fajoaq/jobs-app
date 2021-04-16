const JobsReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_JOBS':
            return { jobs: action.payload };
        default: return state;
    }
}

export default JobsReducer;