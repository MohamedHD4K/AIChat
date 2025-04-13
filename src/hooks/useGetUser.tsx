import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const UseGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/me", {
          withCredentials: true, // Include credentials in the request
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          console.error("Unauthorized: You are not logged in.");
          return null;
        }
        throw error;
      }
    },
  });
};

export default UseGetUser;
