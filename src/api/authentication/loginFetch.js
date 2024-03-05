import axios from "axios";

export default async ({ username, password }) => {
  try {
    const response = await axios.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
