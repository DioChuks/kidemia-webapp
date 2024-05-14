import React, { CSSProperties, useState, useEffect } from "react";
import LogoCC from "../assets/images/KIDEMIA LOGO pro 2.png";
import Ellipse from "../assets/images/Ellipse 1.svg";
import MenuIcon from "../components/icons/MenuIcon";
import BellIcon from "../components/icons/BellIcon";
import { Link } from "react-router-dom";
import Loader from "../components/layouts/Loader";

export interface MyCustomCSS extends CSSProperties {
  "--textSmVal": number | string;
}

function Landing() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="overflow-x-hidden" id="app">
      <div className="w-max-screen h-max-screen top-section">
        <header className="h-10p flex justify-between items-center bg-dark header">
          <div className="logo">
            <img src={LogoCC} alt="Kidemia" className="w-inherit h-inherit" />
          </div>
          {/*medium to large screen*/}
          <nav className="flex items-center nav sm-d-none">
            <ul className="flex items-center">
              <li className="nav-item">
                <a href="#">Pricing</a>
              </li>
              <li className="nav-item">
                <a href="#">Scheme</a>
              </li>
              <li className="nav-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <a href="#">
                  <BellIcon />
                </a>
              </li>
              <ul>
                <li className="nav-item">
                  <a href="user-profile">
                    <img src={Ellipse} alt="User-icon" />
                  </a>
                </li>
              </ul>
            </ul>
          </nav>
          {/*small screen*/}
          <nav className="relative hidden md-d-none z-10" id="mobile-menu">
            <ul className="absolute top-2 right-2 left-2 w-20 h-30 border flex flex-col justify-around items-center bg-brand-white rounded-sm">
              <li className="nav-item">
                <a href="#">Pricing</a>
              </li>
              <li className="nav-item">
                <a href="#">Scheme</a>
              </li>
              <li className="nav-item">
                <a href="#">Dashboard</a>
              </li>
              <a href="#" className="flex items-center gap-1 text-dark">
                <BellIcon /> Notifications
              </a>
              <li className="nav-item">
                <a
                  href="user-profile"
                  className="w-5 h-4 flex items-center gap-1"
                >
                  <img src={Ellipse} alt="User-icon" className="w-2 h-2" />{" "}
                  Account
                </a>
              </li>
            </ul>
          </nav>
          <MenuIcon />
        </header>
        <div className="h-90p flex justify-center items-center flex-col gap-10">
          <div className="flex flex-col text-center gap-10">
            <div className="top-heading">
              <h1
                className="whitespace-no overflow-hidden text-40 sm-text-value text-white animate-typing"
                style={{ "--textSmVal": "2rem" } as MyCustomCSS}
              >
                Welcome to Kidemia
              </h1>
              <p className="whitespace-no overflow-hidden text-20 text-white animate-typing">
                Get the best out of your ward!
              </p>
            </div>
            <div className="w-full flex justify-center gap-10">
              <Link
                to={"/login"}
                className="btn btn-primary animate-scale-out sm-btn"
                id="testModalBtn"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="btn btn-primary animate-scale-out sm-btn"
                id="examModalBtn"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Landing;
