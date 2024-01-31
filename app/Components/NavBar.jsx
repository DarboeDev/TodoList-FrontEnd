"use client"
import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import {DarkModeContext} from '../Context/DarkmodeContext';

const NavBar = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <nav className={`w-full flex justify-between items-center ${darkMode ? 'bg-dark-bg' : 'bg-purple-500'}`}>
      <div className='flex gap-2 text-white ml-4 items-center p-2'>
           <ChecklistIcon style={{ fontSize: 35 }} className={`${darkMode ? 'text-purple-500' : 'text-white'}`}/>
           <h1 className={`text-lg font-bold ${darkMode ? 'bg-dark-bg' : 'bg-purple-500'}`}>To Do</h1>
      </div>
      <div className='flex items-center gap-2 bg-white px-2 py-2 rounded-lg w-[35%]'>
           <SearchIcon style={{ fontSize: 24, color: 'purple' }}/>
           <input type="text" name="" id="" className=' w-full h-full focus:outline-none font-semibold text-lg text-purple-950' />
      </div>
      <div className='flex text-white mr-6 items-center gap-2'>
       { !darkMode ?
          <Tooltip title="Dark Mode" arrow onClick={()=> {
            setDarkMode(true);
            toast('Hello Darkness!',
            {
              icon: '👏',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
          );
          }}>
      <IconButton>
      <DarkModeIcon style={{ fontSize: 31, color: 'white' }}/>
      </IconButton>
    </Tooltip>      
    :
    <Tooltip title="Light Mode" arrow onClick={()=> {
      setDarkMode(false);
      toast('Let there be LIGHT!',
      {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#fff',
          color: '#333',
        },
      }
    );
    }}>
      <IconButton>
      <LightModeIcon style={{ fontSize: 31 }} className={`${darkMode ? 'text-purple-500' : 'text-white'}`}/>
      </IconButton>
    </Tooltip>
}
      </div>
    </nav>
  )
}

export default NavBar ;