import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { IoCalendarOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { FiSun } from "react-icons/fi";

const SideMenu = () => {
  return (
    <div className='flex flex-col gap-4 w-[300px] py-8 custom-shadow h-screen'>
      <MenuIcon className='ml-10 cursor-pointer hover:text-gray-600' style={{ fontSize: 25 }}/>
      <div className='flex flex-col text-gray-600'>
        <button className='flex items-center gap-5 p-2 py-3 hover:bg-purple-100 duration-200 pl-10'>
        <FiSun size={27}/>
        <h1>My Day</h1>
        </button>
        <button className='flex items-center gap-5 p-2 py-3 hover:bg-purple-100 duration-200 pl-10'>
          <StarOutlineIcon style={{ fontSize: 25 }}/>
        <h1>Important</h1>
        </button>
        <button className='flex items-center gap-5 p-2 py-3 hover:bg-purple-100 duration-200 pl-10'>
          <IoCalendarOutline size={25}/>
        <h1>Planned</h1>
        </button>
        <button className='flex items-center gap-5 p-2 py-3 hover:bg-purple-100 duration-200 pl-10'>
          <GoHome size={25}/>
        <h1>All Tasks</h1>
        </button>
      </div>
      <div className='bg-gray-300 flex w-[80%] h-px px-4 mx-auto mt-5'></div>
    </div>
  )
}

export default SideMenu