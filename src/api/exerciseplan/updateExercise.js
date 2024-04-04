import axios from 'axios';

export default async (jwt, exercise) => {
  try {
    const response = await axios.put(
      `/exercise/${exercise.id}`,
      { ...exercise },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': ['PUT'],
          'Access-Control-Request-Methods': ['PUT'],
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
