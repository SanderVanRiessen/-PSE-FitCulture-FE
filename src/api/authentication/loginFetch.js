import axios from "axios";
import CONFIG from "@/app-config";

export default async ({ username, password }) => {
  try {
    const response = await axios.post(CONFIG.BACKEND_URL + "/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
