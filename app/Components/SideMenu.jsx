import MenuIcon from '@mui/icons-material/Menu';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { IoCalendarOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { FiSun } from "react-icons/fi";
import {useState } from 'react'
import Link from 'next/link';


const SideMenu = ({showMenu, setShowMenu}) => {

  const [activeLink, setActiveLink] = useState('home');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  if (showMenu) {
  return (
    <div className='flex flex-col gap-4 w-[300px] py-8 custom-shadow h-screen duration-400 '>
      <MenuIcon className='ml-10 cursor-pointer hover:text-gray-600' 
      style={{ fontSize: 28 }} onClick={()=> setShowMenu(false)}/>
      <div className='flex flex-col text-gray-600'>
        <button
         className={activeLink === 'home' ? 
         'bg-purple-200 flex font-bold items-center gap-5 p-2 py-3 hover:bg-purple-200 duration-200 pl-10' 
         :
          'flex items-center gap-5 p-2 py-3 hover:bg-purple-100 duration-200 pl-10'}
          onClick={() => handleLinkClick('home')}
          >
        <FiSun size={27}/>
        <h1>My Day</h1>
        </button>
        <button
         className={activeLink === 'important' ? 
         'bg-purple-200 flex font-bold items-center gap-5 p-2 py-3 hover:bg-purple-200 duration-200 pl-10' 
         :
          'flex items-center gap-5 p-2 py-3 hover:bg-purple-100 duration-200 pl-10'}
          onClick={() => handleLinkClick('important')}>
          <StarOutlineIcon style={{ fontSize: 25 }}/>
        <h1>Important</h1>
        </button>
        <button  className={activeLink === 'planned' ? 
         'bg-purple-200 flex font-bold items-center gap-5 p-2 py-3 hover:bg-purple-200 duration-200 pl-10' 
         :
          'flex items-center gap-5 p-2 py-3 hover:bg-purple-100 duration-200 pl-10'}
          onClick={() => handleLinkClick('planned')}>
          <IoCalendarOutline size={25}/>
        <h1>Planned</h1>
        </button>
        <button  className={activeLink === 'allTask' ? 
         'bg-purple-200 flex font-bold items-center gap-5 p-2 py-3 hover:bg-purple-200 duration-200 pl-10' 
         :
          'flex items-center gap-5 p-2 py-3 hover:bg-purple-100 duration-200 pl-10'}
          onClick={() => handleLinkClick('allTask')}>
          <GoHome size={25}/>
        <h1>All Tasks</h1>
        </button>
        <button  className={activeLink === 'completed' ? 
         'bg-purple-200 flex font-bold items-center gap-5 p-2 py-3 hover:bg-purple-200 duration-200 pl-10' 
         :
          'flex items-center gap-5 p-2 py-3 hover:bg-purple-100 duration-200 pl-10'}
          onClick={() => handleLinkClick('completed')}>
          <TaskAltIcon size={25}/>
        <h1>Completed</h1>
        </button>
      </div>
      <div className='bg-gray-300 flex w-[80%] h-px px-4 mx-auto mt-5'></div>
    </div>
  )
}
}

export default SideMenu