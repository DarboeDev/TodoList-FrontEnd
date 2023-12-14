import React from 'react'
import ChecklistIcon from '@mui/icons-material/Checklist';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

const NavBar = () => {
  return (
    <nav className='w-full flex justify-between items-center bg-purple-500'>
      <div className='flex gap-2 text-white ml-4 items-center p-2 '>
           <ChecklistIcon style={{ fontSize: 35 }}/>
           <h1 className='text-lg font-bold'>To Do</h1>
      </div>
      <div className='flex items-center gap-2 bg-white px-2 py-2 rounded-lg w-[35%]'>
           <SearchIcon style={{ fontSize: 24, color: 'purple' }}/>
           <input type="text" name="" id="" className=' w-full h-full focus:outline-none font-semibold text-lg text-purple-950' />
      </div>
      <div className='flex text-white mr-6 items-center'>

        <button className='bg-purple-500 hover:bg-purple-600 duration-200 h-[57px] py-3 px-4 w-full'>
        <DarkModeIcon style={{ fontSize: 28 }}/>
        </button>
        
        <button className='bg-purple-500 hover:bg-purple-600 duration-200 h-[57px] py-3 px-4 w-full'>
        <AccountCircleIcon style={{ fontSize: 28 }}/>
        </button>

        <button className='bg-purple-500 hover:bg-purple-600 duration-200 h-[57px] py-3 px-4 w-full'>
        <SettingsIcon style={{ fontSize: 28 }}/>
        </button>
      </div>
    </nav>
  )
}

export default NavBar