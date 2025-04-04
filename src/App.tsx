import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Signup from "./screens/Signup";
import Login from "./screens/Login";

function App() {
  const object = {
    name: "John",
  };

  if ("age" in object) {
    console.log(object.age);
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
