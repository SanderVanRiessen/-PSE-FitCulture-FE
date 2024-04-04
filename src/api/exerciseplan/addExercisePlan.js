import axios from 'axios';

export default async (jwt, exerciseplan) => {
  try {
    const response = await axios.post(
      `/exerciseplan`,
      { ...exerciseplan },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': ['POST'],
          'Access-Control-Request-Methods': ['POST'],
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
