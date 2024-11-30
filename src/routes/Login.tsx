import React, { CSSProperties, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import MailIcon from "../components/icons/MailIcon";
import ScanIcon from "../components/icons/ScanIcon";
import logo2 from "../assets/images/logo2.png";
import googleLogo from "../assets/images/google.png";
import toast, { Toaster } from "react-hot-toast";
import { attemptLogin } from "../lib/user/api-auth";
import { handleRequestError } from "../lib/api-error-handler";

export interface MyCustomCSS extends CSSProperties {
  "--rWidthValue": string;
  "--rH": string;
  "--textColor": string;
  "--bgHoverColor": string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleGoogleAuth = () => {
    toast.error("Unavailable!");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('signing in...');
    try {
      const response = await attemptLogin(email, password);
      toast.success("redirecting...", { id: toastId });

      login(response);

      setTimeout(() => {
        navigate("/dashboard");
      },2000)
    } catch (error) {
      console.error("Login error:", error);
      handleRequestError(error, toastId);
    }
  };

  return (
    <main className="relative w-full h-max-screen flex flex-col justify-evenly items-center bg-brand-white element-before">
      <div
        className="w-3-quarts h-50 flex flex-col p-5 justify-evenly items-center gap-5 bg-brand-white rounded-sm shadow-auth z-1 animate-slideDown sm-md-width h-md-sm"
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
            <h2 className="text-center text-lg md:text-3xl font-bold">Welcome back</h2>
            <p className="text-sm md:text-xl font-normal text-dark text-center">Login to continue</p>
          </div>
        </header>
        <form
          id="body"
          className="w-3-quarts flex flex-col justify-between items-center gap-5"
          onSubmit={handleLogin}
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
                  className="w-full border-none outline-none bg-transparent font-xs text-16 text-dark"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div
                id="inputPasswordBox"
                className="flex items-center bg-inputGrey gap-5 p-5 rounded-sm"
              >
                <label htmlFor="password">
                  <ScanIcon />
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full border-none outline-none bg-transparent"
                  value={password}
                  onChange={handlePasswordChange}
                  minLength={6}
                  required
                />
              </div>
              <Link
                to="/forgot-password"
                className="w-fit text-red text-hover-underline font-normal"
              >
                Forgot Password
              </Link>
              <button
                id="loginBtn"
                className="w-full p-10 bg-primary text-white text-hover-color font-xs rounded-sm border-none cursor-pointer transition-all"
                style={{ "--textColor": "#f7f7f7" } as MyCustomCSS}
                type="submit"
              >
                Login
              </button>
              <h3 className="font-lg text-center">OR</h3>
              <a
                href="#"
                id="registerWithGoogle"
                className="w-full flex items-center gap-10 p-10 bg-white bg-hover text-sm md:text-lg font-medium rounded-sm border-none cursor-pointer transition-all"
                style={{ "--bgHoverColor": "#f7f7f7" } as MyCustomCSS}
                onClick={handleGoogleAuth}
              >
                <img src={googleLogo} alt="google-logo" /> Continue with Google
              </a>
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
      <Toaster/>
    </main>
  );
};

export default LoginPage;
