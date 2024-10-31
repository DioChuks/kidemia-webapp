import React from 'react';
import logo from "../../assets/images/KIDEMIA LOGO pro 2.png";

const Logo: React.FC = () => (
  <div className="logo">
    <a href="/" className="w-inherit h-inherit">
      <img src={logo} alt="Kidemia" className="w-inherit h-inherit" />
    </a>
  </div>
);

export default Logo;
