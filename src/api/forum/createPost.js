import axios from 'axios';

const createPost = async (jwt, postData) => {
  try {
    const response = await axios.post(
      `/forum/${postData.topicId}/post`,
      { body: postData.body },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

export default createPost;
