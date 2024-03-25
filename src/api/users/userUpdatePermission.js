import axios from 'axios';

export default async ({ token, id, role }) => {
  try {
    const response = await axios.post(
      '/user/setauthor',
      {
        id,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': ['Get'],
          'Access-Control-Request-Methods': ['Get'],
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
