const qs = require('qs');
import axios from 'axios';

import GITHUB_API_ROOT from '../api/github';
import { GITHUB_API_ROOT_SINGLE } from '../api/github';

const JOB_QUERY_PARAMS = {
    description: 'company'
}

const likeJob = (id, initialRegion, dispatch) => {
    dispatch({ type: 'LIKE_JOB', payload: { id, initialRegion} })
}

const clearLikedJobs = (dispatch) => {
    dispatch({ type: 'CLEAR_LIKED_JOBS' });
}

const fetchJobs = async (region, dispatch) => {
    try {
        const url = buildJobsUrl(region);
        const { data } = await axios.get(url);

        dispatch({ type: 'FETCH_JOBS', payload: data})
    } catch (e) {
        console.log(e);
    }
};

const fetchJobsById = async (jobs) => {
    let likedJobs = await Promise.all(jobs.map(async (job) => {
        try {
            const url = GITHUB_API_ROOT_SINGLE + job.id + '.json?';
            let { data } = await axios.get(url);

            return {...data, initialRegion: job.initialRegion};
        } catch (e) {
            console.log(err);
            return { error: 'Position no longer available.'}
        }
    }));
    return likedJobs;
}

const buildJobsUrl = (region) => {
    const query = qs.stringify({
        ...JOB_QUERY_PARAMS, 
        lat: region.latitude,
        long: region.longitude
    });

    return GITHUB_API_ROOT + query;
};

export { fetchJobs as default, likeJob, fetchJobsById, clearLikedJobs };