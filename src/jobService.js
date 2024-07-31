import axios from 'axios';

const API_URL = 'https://api.adzuna.com/v1/api/jobs/us/search/1';
const APP_ID = 'bd93ce53';
const APP_KEY = 'd123a13c2d9e8aa37c7dd9ec972a1dba';

export const fetchJobs = async (description, location) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        app_id: APP_ID,
        app_key: APP_KEY,
        what: description,
        where: location
      }
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching jobs", error);
    return [];
  }
};
