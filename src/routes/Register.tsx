import React, { CSSProperties, useState } from 'react';
import { Link } from 'react-router-dom';
import StudentStep from './steps/StudentStep';
import SchoolStep from './steps/SchoolStep';
import Logo from '../assets/images/KIDEMIA LOGO pro.png';
import Student from '../assets/images/Student.png';
import School from '../assets/images/School.png';

export interface MyCustomCSS extends CSSProperties {
  '--bgHoverColor': string;
  '--textColor': string;
  '--rWidthValue': string;
  '--rH': string;
  '--ct': string;
}

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState<'choose' | 'student' | 'school'>('choose');

  const handleUserTypeClick = (userType: 'student' | 'school') => {
    setStep(userType);
  };

  const renderStep = () => {
    switch (step) {
      case 'student':
        return <StudentStep />;
      case 'school':
        return <SchoolStep />;
      default:
        return (
          <div id="step" className="w-full flex flex-col items-center gap-5">
            <h2>Are you a</h2>
            <div className="w-full flex justify-between">
              <Link
                to="#"
                className="relative flex flex-col gap-5 items-center p-10 border border-primary rounded-lg cursor-pointer transition-all label-user bg-hover text-hover-color"
                style={{ '--bgHoverColor': '#f28729', '--textColor': 'white' } as MyCustomCSS}
                onClick={() => handleUserTypeClick('student')}
              >
                <div className="w-9 h-8">
                  <img src={Student} alt="sub-img" className="w-inherit h-inherit" />
                </div>
                <h2>Student</h2>
              </Link>
              <Link
                to="#"
                className="relative flex flex-col gap-5 items-center p-10 border border-primary rounded-lg cursor-pointer transition-all label-user bg-hover text-hover-color"
                style={{ '--bgHoverColor': '#f28729', '--textColor': 'white' } as MyCustomCSS}
                onClick={() => handleUserTypeClick('school')}
              >
                <div className="w-9 h-8">
                  <img src={School} alt="sub-img" className="w-inherit h-inherit" />
                </div>
                <h2>School</h2>
              </Link>
            </div>
            <div className="w-full flex items-center justify-center">
              <Link to="/login" className="w-full bg-primary text-white text-center font-xs cursor-pointer rounded-xs p-5">
                I have an account, Login
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="relative w-full h-max-screen flex flex-col justify-evenly items-center bg-brand-white element-before">
      <div
        className="w-3-quarts h-55 flex flex-col p-5 items-center gap-5 bg-brand-white rounded-sm shadow-auth z-1 animate-slideDown sm-md-width h-md-sm sm-md-justify"
        style={{ '--rWidthValue': '95%', '--rH': '80%', '--ct': 'space-evenly' } as MyCustomCSS}
      >
        <Link to="/" className="h-8 h-md-sm" style={{ '--rH': '50px' } as MyCustomCSS}>
          <img src={Logo} alt="logo-pro-1" className="w-inherit h-inherit" />
        </Link>
        <header className="flex flex-col justify-between items-center gap-5" id="formHeader">
          <div id="title">
            <h2 className="font-sm text-center">
              Welcome to <span className="font-lg text-secondary">KIDEMIA</span>
            </h2>
            <p className="font-xs text-dark">Complete your registration in just 4 steps</p>
          </div>
        </header>
        <div id="body" className="w-3-quarts flex flex-col justify-between items-center gap-5 sm-md-width h-md-sm" style={{ '--rWidthValue': '90%', '--rH': '70%' } as MyCustomCSS}>
          <div id="pagination" className="flex items-center gap-5 sm-md-width" style={{ '--rWidthValue': '90vw' } as MyCustomCSS}>
            {[1, 2, 3, 4].map((number) => (
              <React.Fragment key={number}>
                <div
                  className={`w-2 h-2 flex items-center p-5 rounded-full ${number === 1 ? 'bg-primary' : 'bg-light-grey'} text-white text-center`}
                  id="number"
                >
                  {number}
                </div>
                {number !== 4 && <span className="font-lg text-light-grey text-center sm-w-value" id="bar" style={{ '--rWidthValue': '100%' } as MyCustomCSS}>- - - -</span>}
              </React.Fragment>
            ))}
          </div>
          {renderStep()}
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
