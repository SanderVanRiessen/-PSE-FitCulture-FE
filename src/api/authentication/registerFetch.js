import axios from "axios";

export default async (user) => {
  try {
    const response = await axios.post("/public/register", {
      ...user,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
