import axios from "axios";
import CONFIG from "@/app-config";

export default async (user) => {
  try {
    const response = await axios.post(CONFIG.BACKEND_URL + "/public/register", {
      ...user,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
  // const response = await fetch(CONFIG.BACKEND_URL + "/public/register", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(user),
  // });

  // const data = await response.json();

  // if (data.error) throw new Error(data.error);

  // return data;
};
