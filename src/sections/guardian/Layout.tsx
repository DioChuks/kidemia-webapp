import React, { useEffect } from 'react';
import Header from '../../components/admin/Header';
import { Outlet } from 'react-router-dom';
import Loader from '../../components/layouts/Loader';
import Sidebar from '../../components/guardian/Sidebar';

const GuardianLayout: React.FC = () => {

  useEffect(() => {
    const loader = document.querySelector('.loader-container');
    const preloader = document.querySelector('.preloader');
    const app = document.getElementById('app');

    if (preloader) setTimeout(() => {preloader.classList.add('hidden'); loader?.classList.add('hidden')}, 1500);
    if (app) {
      app.classList.remove('hidden');
      app.classList.add('visible');
    }
  }, []);

  
  return (
    <>
    <div className='w-full h-full z-1 fixed bg-semi-black loader-container'>
      <Loader/>
    </div>
    <div id="app" className="hidden">
      <div className="h-max-screen">
        <Header />
        <div className="w-full h-90p sm-md-height flex justify-between gap-5">
          <Sidebar />
          <div className="w-85p max-sm-w-full h-full flex flex-col gap-5 items-center p-10 ml-5 overflow-auto">
            <div className="w-full h-full flex-flex-col justify-evenly items-center gap-10">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default GuardianLayout;
