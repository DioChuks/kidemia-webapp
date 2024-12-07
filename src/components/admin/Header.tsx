import React, { useContext, useState } from 'react';
import Logo from '../icons/Logo';
import BellIcon from '../icons/BellIcon';
import MenuIcon from '../icons/MenuIcon';
import ReportLineIcon from '../icons/ReportLine';
import BooksIcon from '../icons/Books';
import { AuthContext } from '../../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { attemptLogout } from '../../lib/api-logout';
import { handleRequestError } from '../../lib/api-error-handler';

const Header: React.FC = () => {
  const { logout, userData } = useContext(AuthContext)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  const handleLogout = async () => {
    const toastId = toast.loading('signing out...');
    try {
      const response = await attemptLogout();
      toast.success(response.message, { id: toastId });
      logout();
    } catch (error) {
      handleRequestError(error, toastId);
    }
  }
  return (
    <header className="h-10p flex justify-between items-center bg-secondary header">
      <Logo />
      {/* {{-- medium to large screen --}} */}
      <nav className="flex items-center nav sm-d-none">
        <ul className="flex items-center relative">
          <li className="nav-item"><a href="#"><BellIcon /></a></li>
          <li className="text-white nav-item cursor-pointer" onClick={handleModalToggle}>Admin</li>
          {isModalOpen && (<ul
            className="absolute top-3 right-2 w-10 h-4 border flex flex-col justify-around items-center bg-brand-white rounded-sm">
            <li className="text-red nav-item font-lg cursor-pointer" onClick={handleLogout}>Logout</li>
          </ul>)}
        </ul>
      </nav>
      {/* {{-- small screen --}} */}
      {isModalOpen && (<nav className="relative md-d-none z-10" id="mobile-menu">
        <ul
          className="absolute top-2 right-2 left-2 w-20 h-30 border flex flex-col justify-around items-center bg-brand-white rounded-sm">
          <a href={userData.role === 'admin' ? '/admin/dashboard/report' : '/admin/guardian/ward-report'} className="flex items-center gap-1 text-dark"><ReportLineIcon /> Report</a>
          <a href={userData.role === 'admin' ? '/admin/dashboard/subjects' : '/admin/guardian'} className="flex items-center gap-1 text-dark"><BooksIcon /> {userData.role === 'admin' ? 'Subjects' : 'Wards'}</a>
          <a href="#" className="flex items-center gap-1 text-dark"><BellIcon /> Notifications</a>
          <li className="text-red nav-item font-lg" onClick={logout}>Logout</li>
        </ul>
      </nav>)}
      <span className='md-d-none' onClick={handleModalToggle}><MenuIcon /></span>
      <Toaster/>
    </header>
  )
};

export default Header;
