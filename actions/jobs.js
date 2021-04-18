/* const reverseGeocode = require('latlng-to-zip'); */
const qs = require('qs');
import axios from 'axios';

import GITHUB_API_ROOT from '../api/github';

const JOB_QUERY_PARAMS = {
    description: 'web'
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

const buildJobsUrl = (region) => {
    const query = qs.stringify({
        ...JOB_QUERY_PARAMS, 
        lat: region.latitude,
        long: region.longitude
    });

    return GITHUB_API_ROOT + query;
};

export default fetchJobs;