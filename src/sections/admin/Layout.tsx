import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/Sidebar';
import Modal from '../../components/admin/SubjectModal';
import { Outlet } from 'react-router-dom';
import PlusIcon from '../../components/icons/Plus';
import Loader from '../../components/layouts/Loader';
import LeftArrowIcon from '../../components/icons/LeftArrow';

const AdminLayout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);
  const routeMessages: { [key: string]: string } = {
    '/admin/dashboard': 'Hello, Admin',
    '/admin/dashboard/report': 'Reports Overview',
    '/admin/dashboard/subjects': 'Subjects Management',
    '/admin/dashboard/new-question': 'New Question',
    '/admin/dashboard/upload-subjects': 'Bulk Import Subjects',
  };

  // Get the message based on the current pathname or set a default
  const currentMessage = routeMessages[location.pathname];

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
          <div className="w-85p max-sm-w-full h-full flex flex-col gap-5 items-center p-10 ml-5 mr-5 overflow-auto">
            <div className="w-full h-full flex-flex-col justify-evenly items-center gap-10">
              <div className="h-15p sm-md-height-auto sm-md-mb-4 flex md-flex-row flex-col justify-between items-center gap-5">
                {currentMessage ? <h3 className="text-dark">{currentMessage}</h3> : <button onClick={() => navigate(-1)} className='w-4 h-4 flex items-center justify-center rounded-full text-dark border cursor-pointer'><LeftArrowIcon/></button>}
                <div className="flex md-flex-row flex-col items-center gap-5">
                  <div className="flex items-center">
                    <h5 className="text-dark">Category:</h5>
                    <select name="category" id="usersCategory" className="border-none outline-none bg-transparent">
                      <option value="1">Common Entrance</option>
                      <option value="2">Junior WAEC</option>
                      <option value="3">Senior WAEC</option>
                    </select>
                  </div>
                  <button
                      id="openBtn"
                      className="flex items-center gap-5 p-10 border-none outline-none bg-primary bg-hover text-white rounded-sm cursor-pointer transition-all" style={{"--bgHoverColor":"var(--infoColor)"} as React.CSSProperties}
                      onClick={handleModalToggle}
                    ><PlusIcon/>
                      Add Subject
                  </button>
                </div>
              </div>
            <Outlet/>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onClose={handleModalToggle} />}
    </div>
    </div>
    </>
  );
};

export default AdminLayout;
