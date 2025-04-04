import Lottie from "lottie-react";
import animationData from "../../assets/lottie/3.json";

const WelcomeLottie = () => {
  return (
    <div className="w-full">
      <Lottie animationData={animationData} loop={true} autoplay={true} />
    </div>
  );
};

export default WelcomeLottie;
