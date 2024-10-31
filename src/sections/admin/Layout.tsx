import React, { useState, useEffect } from 'react';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/Sidebar';
import Modal from '../../components/admin/Modal';
import cardConfig from './data/Card';
import BarChart from '../../components/charts/BarChart';
import CardInfoBox from '../../components/cards/CardInfoBox';
import PlusIcon from '../../components/icons/Plus';

const AdminLayout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const preloader = document.querySelector('.preloader');
    const app = document.getElementById('app');

    if (preloader) preloader.classList.add('hidden');
    if (app) {
      app.classList.remove('hidden');
      app.classList.add('visible');
    }
  }, []);

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  return (
    <div id="app" className="hidden">
      <div className="h-max-screen">
        <Header />
        <div className="w-full h-90p flex justify-between gap-5">
          <Sidebar />
          <div className="w-85p h-full flex flex-col gap-5 items-center p-10 ml-5 mr-5 overflow-auto">
          <div className="w-full h-full flex-flex-col justify-evenly items-center gap-10">
          <div className="h-15p flex justify-between items-center gap-5">
            <h3 className="text-dark">Hello, Admin</h3>
            <div className="flex items-center gap-5">
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
            <div className="w-full flex justify-between items-center gap-5 flex-wrap">
            {Object.entries(cardConfig).map(([key, config]) => (
                <CardInfoBox
                  icon={config.icon}
                  title={config.title}
                  amount={config.amount}
                  className={config.class}
                  type={config.type}
                  key={key}/>
            ))}
            </div>
            <br/>
            <div className="w-full h-half flex items-center gap-10">
              <BarChart bars={[30,15,5,60,90]} titleId='recent-test' className='bg-white rounded-sm'/>
              <BarChart bars={[30,45,35,55,50]} titleId='recent-exam' className='bg-white rounded-sm'/>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onClose={handleModalToggle} />}
    </div>
    </div>
  );
};

export default AdminLayout;
