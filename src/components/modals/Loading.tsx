import React from "react";
import Logo2 from "../../assets/images/logo2.png";

const Loading: React.FC = () => {
  return (
    <div
      id="loadingMode"
      className="fixed z-10 w-max-screen h-max-screen flex items-center justify-center bg-semi-black"
    >
      <div className="w-half h-half flex justify-center items-center bg-brand-white rounded-md z-99">
        <div className="h-10 transition-all animate-show-border">
          <img src={Logo2} alt="loading..." className="animate-spin-off" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
