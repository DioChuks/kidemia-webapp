import React from "react";
import Logo2 from "../../assets/images/logo2.png";

const Loader: React.FC = () => {
  return (
    <div className="fixed w-full h-full flex justify-center items-center preloader">
      <div className="w-full h-max-screen flex justify-center items-center z-99 main-wrapper">
        <div className="loader-box">
          <img src={Logo2} alt="loading..." />
        </div>
      </div>
    </div>
  );
};

export default Loader;
