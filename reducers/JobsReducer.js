import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultState = {
    jobs: [],
    likedJobs: []
};

const JobsReducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'REHYDRATE':
            return { jobs: [], likedJobs: JSON.parse(action.payload) };
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

            AsyncStorage.setItem('likedJobs', JSON.stringify(newLikedList));
            return { jobs: state.jobs, likedJobs: newLikedList };
        case 'CLEAR_LIKED_JOBS':
            AsyncStorage.removeItem('likedJobs');
            return defaultState;
        default: return state;
    }
};

export default JobsReducer;