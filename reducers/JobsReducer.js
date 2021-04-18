const defaultState = {
    jobs: [],
    likedJobs: []
};

const JobsReducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'FETCH_JOBS':
            return { jobs: action.payload, likedJobs: state.likedJobs };
        case 'LIKE_JOB':
            const newLikedList = [
                ...state.likedJobs,
                action.payload
            ];
            return { jobs: state.jobs, likedJobs: newLikedList };
        default: return state;
    }
};

export default JobsReducer;