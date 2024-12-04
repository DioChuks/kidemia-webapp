import React, { CSSProperties, useState } from "react";
import { Link } from "react-router-dom";
import MailIcon from "../components/icons/MailIcon";
import logo2 from "../assets/images/logo2.png";

export interface MyCustomCSS extends CSSProperties {
  "--rWidthValue": string;
  "--rH": string;
  "--textColor": string;
  "--bgHoverColor": string;
}

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform login logic here
    console.log("Email:", email);
  };

  return (
    <main className="relative w-full h-max-screen flex flex-col justify-evenly items-center bg-brand-white element-before">
      <div
        className="w-3-quarts max-w-4xl h-50 flex flex-col p-5 justify-evenly items-center gap-5 bg-brand-white rounded-sm shadow-auth z-1 animate-slideDown sm-md-width h-md-sm"
        style={{ "--rWidthValue": "95%", "--rH": "80%" } as MyCustomCSS}
      >
        <Link to="/" className="h-8 r-img">
          <img src={logo2} alt="logo-pro-1" className="w-inherit h-inherit" />
        </Link>
        <header
          className="flex flex-col justify-between items-center gap-5"
          id="formHeader"
        >
          <div id="title">
            <h2 className="font-bold text-black text-xl md:text-3xl text-center">Forgot Password</h2>
            <p className="text-sm md:text-xl font-normal text-dark text-center">
              Place your email to receive your reset link
            </p>
          </div>
        </header>
        <form
          id="body"
          className="w-3-quarts flex flex-col justify-between items-center gap-5"
          onSubmit={handleForgot}
        >
          <div
            id="steps"
            className="w-3-quarts sm-w-value"
            style={{ "--rWidthValue": "100%" } as MyCustomCSS}
          >
            <div id="step" className="flex flex-col gap-5">
              <div
                id="inputBox"
                className="flex items-center bg-inputGrey gap-5 p-5 rounded-sm"
              >
                <label htmlFor="email">
                  <MailIcon />
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email"
                  className="w-full border-none outline-none bg-transparent font-xs text-16 text-dark md:h-14"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>

              <button
                id="loginBtn"
                className="w-full p-10 bg-primary text-white text-hover-color font-xs rounded-sm border-none cursor-pointer transition-all"
                style={{ "--textColor": "#f7f7f7" } as MyCustomCSS}
                type="submit"
              >
                Continue
              </button>
              <div id="registerLink" className="text-center text-sm md:text-lg font-medium">
                <span>
                  I don't have an account{" "}
                  <Link
                    to="/register"
                    className="text-primary text-hover-underline"
                  >
                    Sign Up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;
