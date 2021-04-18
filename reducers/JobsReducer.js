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
                ...oldLikedList,
                { id: action.payload.id }
            ]
            console.log(newLikedList);
            return { jobs: state.jobs, likedJobs: newLikedList };
        default: return state;
    }
};

export default JobsReducer;