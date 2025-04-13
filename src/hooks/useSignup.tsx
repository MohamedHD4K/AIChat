import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

interface SignupData {
  email: string;
  password: string;
  username: string;
  phone: string;
  confirmPassword: string;
}

interface ApiResponse {
  message: string;
}

const useSignup = () => {
  return useMutation<ApiResponse, AxiosError, SignupData>({
    mutationKey: ["signup"],

    mutationFn: async (value) => {
      const response = await axios.post<ApiResponse>(
        "http://localhost:3000/api/auth/signup",
        value
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "User created successfully", {
        duration: 3000,
        style: { background: "#222", color: "#fff" },
      });
      console.log("User created successfully");
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

export default useSignup;
