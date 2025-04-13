import { useEffect } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import TextArea from "../components/TextArea";
import UseGetUser from "../hooks/useGetUser";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const { data: user, isLoading, error } = UseGetUser();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      console.error("Error fetching user:", error);
    }
  }, [error]);

  return (
    <div className="flex">
      <SideBar />
      <div className="grow h-screen">
        <NavBar userData={!isLoading && user?.userData} isLoading={isLoading} />
        <div className="flex flex-col justify-center h-[90vh] items-center gap-5">
          <h1 className="text-4xl font-semibold">How can I help you?</h1>
          <TextArea />
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Home;
