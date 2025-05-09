import { CiUser } from "react-icons/ci";
import { FaGoogle, FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import Input from "../components/shared/Input";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  MdEmail,
  MdPassword,
  MdVisibility,
  MdVisibilityOff,
  MdPhone,
} from "react-icons/md";
import SignupLottie from "../components/lottie/SignupLottie";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const { mutate, isPending } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleVisible = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
    setFormData({
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen from-indigo-50 to-blue-100 flex items-center bg-base-200 justify-center p-4">
      <div className="flex w-full max-w-4xl rounded-xl overflow-hidden bg-base-100 border shadow-lg border-base-300">
        <div className="hidden md:flex flex-1 bg-gradient-to-r from-base-300/70 to-base-300 items-center justify-center p-6">
          <SignupLottie />
        </div>

        <div className="w-full md:w-1/2">
          <div className="p-6 bg-gradient-to-r from-base-300/70 to-base-300 md:hidden">
            <h1 className="text-3xl font-bold">Join Us Today</h1>
            <p className="text-blue-100 mt-1">
              Create your account to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-4">
              <Input
                name="username"
                icon={<CiUser size={20} />}
                label="Username"
                value={formData.username}
                onChange={handleChange}
              />

              <Input
                name="email"
                type="email"
                icon={<MdEmail size={20} />}
                label="Email address"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                name="phone"
                type="tel"
                icon={<MdPhone size={20} />}
                label="Phone number"
                value={formData.phone}
                onChange={handleChange}
              />

              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                icon={<MdPassword size={20} />}
                label="Create password"
                value={formData.password}
                onChange={handleChange}
                onVisible={() => handleVisible("password")}
                profixIcon={
                  showPassword ? (
                    <MdVisibility className="text-gray-500 cursor-pointer" />
                  ) : (
                    <MdVisibilityOff className="text-gray-500 cursor-pointer" />
                  )
                }
              />

              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                icon={<MdPassword size={20} />}
                label="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onVisible={() => handleVisible("confirmPassword")}
                profixIcon={
                  showConfirmPassword ? (
                    <MdVisibility className="text-gray-500 cursor-pointer" />
                  ) : (
                    <MdVisibilityOff className="text-gray-500 cursor-pointer" />
                  )
                }
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-400"
              >
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 px-4 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg"
            >
              {isPending ? (
                <div className="flex gap-2 items-center justify-center">
                  <span className="loading loading-spinner loading-sm"></span>
                  Loading...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-400"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-base-100 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex justify-evenly">
              <button
                type="button"
                className="inline-flex justify-center items-center p-3 rounded-full shadow-sm 
                text-sm font-medium bg-gradient-to-l from-base-200 to-base-300 
                hover:bg-gradient-to-r hover:from-base-300 hover:to-base-300 "
              >
                <FaGoogle className="h-5 w-5 text-gray-400" />
              </button>
              <button
                type="button"
                className="inline-flex justify-center  items-center p-3 rounded-full shadow-sm 
                text-sm font-medium bg-gradient-to-l from-base-200 to-base-300 
                hover:bg-gradient-to-r hover:from-base-300 hover:to-base-300 "
              >
                <FaGithub className="h-5 w-5 text-gray-400" />
              </button>
              <button
                type="button"
                className="inline-flex justify-center  items-center p-3 rounded-full shadow-sm 
                text-sm font-medium bg-gradient-to-l from-base-200 to-base-300 
                hover:bg-gradient-to-r hover:from-base-300 hover:to-base-300 "
              >
                <FaFacebook className="h-5 w-5 text-gray-400" />
              </button>
              <button
                type="button"
                className="inline-flex justify-center  items-center p-3 rounded-full shadow-sm 
                text-sm font-medium bg-gradient-to-l from-base-200 to-base-300 
                hover:bg-gradient-to-r hover:from-base-300 hover:to-base-300 "
              >
                <FaLinkedin className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </form>

          <div className="px-6 py-4 text-center bg-gradient-to-r from-base-300/70 to-base-300">
            <p className="text-sm text-gray-400">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {" "}
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
