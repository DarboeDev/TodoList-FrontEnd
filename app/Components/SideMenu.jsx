"use client"
import { useContext } from 'react';
import { DataContext } from '../Context/appContext';
import MenuIcon from '@mui/icons-material/Menu';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { IoCalendarOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from 'react';
import Link from 'next/link';
import CategorySection from './CategorySection';
import { DarkModeContext } from '../Context/DarkmodeContext';

const SideMenu = () => {
  const {showMenu,setShowMenu } = useContext(DataContext);
  const {darkMode} = useContext(DarkModeContext);

  const [activeLink, setActiveLink] = useState('home');


  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  if (showMenu) {
    return (
<div className={` overflow-x-hidden flex flex-col gap-4 w-[300px] py-10 custom-shadow min-h-screen duration-400 ${darkMode ? 'bg-dark-sidebar' : 'bg-white'}`}>
  <MenuIcon
    className={`ml-6 cursor-pointer ${darkMode ? 'text-gray-200 hover:text-gray-300' : 'text-black hover:text-gray-600'}`}
    style={{ fontSize: 28 }}
    onClick={() => setShowMenu(false)}
  />
  <div className='flex flex-col'>
    <Link
      href="/"
      className={`
        flex items-center gap-5 p-2 py-3 pl-6
        ${activeLink === 'home' ? 'font-bold' : ''}
        ${darkMode ? 'hover:bg-dark-hover text-gray-400' : 'hover:bg-purple-100'}
        ${activeLink === 'home' && darkMode ? 'bg-dark-hover text-white' : ''}
        ${activeLink === 'home' && !darkMode ? 'bg-purple-200' : ''}
        ${activeLink === 'home' ? 'border-r-4 border-purple-500 text-gray-600' : ''}
        duration-200
      `}
      onClick={() => handleLinkClick('home')}
    >
      <GoHome size={25} />
      <h1>All Tasks</h1>
    </Link>
    <Link
      href="/important"
      className={`
        flex items-center gap-5 p-2 py-3 pl-6
        ${activeLink === 'important' ? 'font-bold' : ''}
        ${darkMode ? 'hover:bg-dark-hover text-gray-400' : 'hover:bg-purple-100'}
        ${activeLink === 'important' && darkMode ? 'bg-dark-hover text-white' : ''}
        ${activeLink === 'important' && !darkMode ? 'bg-purple-200' : ''}
        ${activeLink === 'important' ? 'border-r-4 border-purple-500 text-gray-600' : ''}
        duration-200
      `}
      onClick={() => handleLinkClick('important')}
    >
      <StarOutlineIcon style={{ fontSize: 25 }} />
      <h1>Important</h1>
    </Link>
    <Link
      href="/planned"
      className={`
        flex items-center gap-5 p-2 py-3 pl-6
        ${activeLink === 'planned' ? 'font-bold' : ''}
        ${darkMode ? 'hover:bg-dark-hover text-gray-400' : 'hover:bg-purple-100'}
        ${activeLink === 'planned' && darkMode ? 'bg-dark-hover text-white' : ''}
        ${activeLink === 'planned' && !darkMode ? 'bg-purple-200' : ''}
        ${activeLink === 'planned' ? 'border-r-4 border-purple-500 text-gray-600' : ''}
        duration-200
      `}
      onClick={() => handleLinkClick('planned')}
    >
      <IoCalendarOutline size={25} />
      <h1>Planned</h1>
    </Link>
    <Link
      href="/completed"
      className={`
        flex items-center gap-5 p-2 py-3 pl-6
        ${activeLink === 'completed' ? 'font-bold' : ''}
        ${darkMode ? 'hover:bg-dark-hover text-gray-400' : 'hover:bg-purple-100'}
        ${activeLink === 'completed' ? 'border-r-4 border-purple-500 text-gray-600' : ''}
        ${darkMode && activeLink === 'completed' ? 'bg-dark-hover text-white' : ''}
        ${!darkMode && activeLink === 'completed' ? 'bg-purple-200' : ''}
        duration-200
      `}
      onClick={() => handleLinkClick('completed')}
    >
      <CheckCircleOutlineIcon size={25} />
      <h1>Completed</h1>
    </Link>
  </div>
  <div className='bg-gray-300 flex w-[80%] h-px px-4 mx-auto mt-5'></div>
  <CategorySection/>
</div>

    )}
};

export default SideMenu;
