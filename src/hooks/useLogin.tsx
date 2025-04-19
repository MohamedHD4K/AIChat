import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface LoginData {
  password: string;
  username: string;
}

interface ApiResponse {
  message: string;
}

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<ApiResponse, AxiosError, LoginData>({
    mutationKey: ["login"],

    mutationFn: async (value) => {
      const response = await axios.post<ApiResponse>(
        "http://localhost:3000/api/auth/login",
        value,
        {
          withCredentials: true, // Include credentials in the request
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "User created successfully", {
        duration: 3000,
        style: { background: "#222", color: "#fff" },
      });
      console.log("User created successfully");
      navigate("/");
    },

    onError: (error) => {
      console.error("Error creating user:", error);
      const errorMessage =
        (error.response?.data as { message: string })?.message ||
        "Something went wrong";
      toast.error("Error: " + errorMessage, {
        duration: 3000,
        style: { background: "#222", color: "#fff" },
      });
      console.error("Error creating user:", errorMessage);
    },
  });
};

export default useLogin;
