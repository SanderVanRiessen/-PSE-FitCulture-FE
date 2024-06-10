import axios from 'axios';

const API_URL = '/challenges';

export const getChallenges = async (jwt) => {
  try {
    const response = await axios.get(API_URL, {
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

export const getChallengeById = async (jwt, id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
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

export const createChallenge = async (jwt, challengeData) => {
  try {
    const response = await axios.post(API_URL, challengeData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': ['POST'],
        'Access-Control-Request-Methods': ['POST'],
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const acceptChallenge = async (jwt, challengeData) => {
  try {
    const response = await axios.post(`${API_URL}/accept`, challengeData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': ['POST'],
        'Access-Control-Request-Methods': ['POST'],
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const completeChallenge = async (jwt, challengeData) => {
  try {
    const response = await axios.post(`${API_URL}/complete`, challengeData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': ['POST'],
        'Access-Control-Request-Methods': ['POST'],
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
