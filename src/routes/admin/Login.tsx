import React, { CSSProperties, useState, useContext, useEffect } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import MailIcon from "../../components/icons/MailIcon";
import ScanIcon from "../../components/icons/ScanIcon";
import logo2 from "../../assets/images/logo2.png";
import toast, { Toaster } from "react-hot-toast";
import { attemptLogin } from "../../lib/admin/api-login";
import { handleRequestError } from "../../lib/api-error-handler";

export interface MyCustomCSS extends CSSProperties {
  "--rWidthValue": string;
  "--rH": string;
  "--textColor": string;
  "--bgHoverColor": string;
}

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('signing in...');
    try {
      const userData = await attemptLogin(email, password);
      // Authenticate the admin and set the user data in the authContext
      login(userData);
      
      toast.remove(toastId);
      toast.success("redirecting...");

      // Redirect the user to the desired page after successful login
      setTimeout(() => {
        navigate("/admin/dashboard");
      },2000)
    } catch (error) {
      handleRequestError(error, toastId);
    }
  };

  return isAuthenticated ? null : (
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
            <h2 className="text-center text-xl md:text-3xl font-bold">Admin Access</h2>
            <p className="text-lg md:text-xl text-dark text-center font-medium">Login as Admin or Guardian</p>
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
              <button
                id="loginBtn"
                className="w-full p-10 bg-primary text-white text-hover-color font-xs rounded-sm border-none cursor-pointer transition-all"
                style={{ "--textColor": "#f7f7f7" } as MyCustomCSS}
                type="submit"
              >
                Login
              </button>

            </div>
          </div>
        </form>
      </div>
      <Toaster/>
    </main>
  );
};

export default AdminLoginPage;
