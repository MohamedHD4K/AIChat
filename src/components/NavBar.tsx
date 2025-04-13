import { useNavigate } from "react-router-dom";

interface Data {
  email: string;
  username: string;
  password: string;
  role: string;
  avatar: string;
  phone: string;
}

const NavBar = ({
  userData,
  isLoading,
}: {
  userData?: Data;
  isLoading?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-4 items-center">
      <div className="text-xl font-semibold">AIChat</div>
      <div className="avatar">
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : !userData ? (
          <button
            onClick={() => navigate("/login")}
            className="btn rounded-lg hover:bg-gray-100 text-black bg-white"
          >
            Login
          </button>
        ) : (
          <div className="w-8 rounded-full">
            <img
              src={userData?.avatar || "images/avatar.png"}
              alt="User Avatar"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
