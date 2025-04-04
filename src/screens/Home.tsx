import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import TextArea from "../components/TextArea";

const Home = () => {
 
  return (
    <div className="flex">
      <SideBar />
      <div className="grow h-screen">
        <NavBar />
        <div className="flex flex-col justify-center h-[90vh] items-center gap-5">
          <h1 className="text-4xl font-semibold">How can I help you?</h1>
          <TextArea/>
        </div>
      </div>
    </div>
  );
};

export default Home;
