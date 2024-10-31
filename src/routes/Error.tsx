import React from 'react'
import { Link } from 'react-router-dom'
import logo2 from "../assets/images/logo2.png";

const ErrorPage: React.FC = () => {
  return (
    <main className="relative w-full h-max-screen flex flex-col justify-evenly items-center bg-brand-white element-before">
      <div
        className="w-3-quarts h-50 flex flex-col p-5 justify-evenly items-center gap-5 bg-brand-white rounded-sm shadow-auth z-1 animate-slideDown sm-md-width h-md-sm"
        style={{ "--rWidthValue": "95%", "--rH": "80%" } as React.CSSProperties}
      >
        <Link to="/" className="h-8 r-img">
          <img src={logo2} alt="logo-pro-1" className="w-inherit h-inherit" />
        </Link>
        <header
          className="flex flex-col justify-between items-center gap-5"
          id="formHeader"
        >
          <div id="title">
            <h2 className="text-center">Oops, Not Found!!!</h2>
            <p className="font-xs text-dark text-center">Let's get you back on track!</p>
          </div>
        </header>

              <Link
              to={"/"}
                className="w-fit p-10 bg-primary text-white text-hover-color font-xs rounded-sm border-none cursor-pointer transition-all"
                style={{ "--textColor": "#f7f7f7" } as React.CSSProperties}
              >
                Back to Home
              </Link>
              <div id="registerLink" className="text-center">
                <span>
                  Have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary text-hover-underline"
                  >
                    Login
                  </Link>
                </span>
              </div>
            </div>
        </main>
  )
}

export default ErrorPage
