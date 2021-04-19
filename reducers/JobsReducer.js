const defaultState = {
    jobs: [],
    likedJobs: []
};

const JobsReducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'FETCH_JOBS':
            return { jobs: action.payload, likedJobs: state.likedJobs };
        case 'LIKE_JOB':
            const oldLikedList = state.likedJobs.filter((job) => {
                    return job.id !== action.payload.id;
                } 
            );
            const newLikedList = [
                { ...action.payload },
                ...oldLikedList
            ]
            console.log(newLikedList);
            return { jobs: state.jobs, likedJobs: newLikedList };
        case 'CLEAR_LIKED_JOBS':
            return defaultState;
        default: return state;
    }
};

export default JobsReducer;