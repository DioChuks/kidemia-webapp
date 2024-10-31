import React from 'react';
import Logo from '../icons/Logo';
import BellIcon from '../icons/BellIcon';
import MenuIcon from '../icons/MenuIcon';
import BottomBar from './BottomBar';

const Header: React.FC = () => (
  <header className="h-10p flex justify-between items-center bg-secondary header">
    <Logo />
    {/* {{-- medium to large screen --}} */}
        <nav className="flex items-center nav sm-d-none">
          <ul className="flex items-center">
            <li className="nav-item"><a href="#"><BellIcon/></a></li>
            <li className="text-white nav-item">Admin</li>
        </ul>
        </nav>
        {/* {{-- small screen --}} */}
        <nav className="relative hidden md-d-none z-10" id="mobile-menu">
          <ul
            className="absolute top-2 right-2 left-2 w-20 h-30 border flex flex-col justify-around items-center bg-brand-white rounded-sm">
            <a href="#" className="flex items-center gap-1 text-dark"><BellIcon /> Notifications</a>
            <li className="text-white nav-item">Admin</li>
          </ul>
        </nav>
        <MenuIcon/>
        <BottomBar/>
  </header>
);

export default Header;
