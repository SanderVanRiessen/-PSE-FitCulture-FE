import axios from 'axios';

export default async (jwt) => {
  try {
    const response = await axios.get(`/yourexerciseplans`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': ['GET'],
        'Access-Control-Request-Methods': ['GET'],
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
