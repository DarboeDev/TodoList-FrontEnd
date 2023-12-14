import {useState, useRef, useEffect } from 'react'
import React from 'react';
const axios = require('axios');
import { FiSun } from "react-icons/fi";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import SortIcon from '@mui/icons-material/Sort';
import { FaLayerGroup } from "react-icons/fa";

const ToDoMain = ({showMenu, setShowMenu}) => {
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [allTasks, setAllTasks] = useState(null);
  const url = 'http://localhost:8080';
  const inputRef = useRef(null);

    const handleAddIconClick = () => {
    setShowAddOptions(true);
    inputRef.current.focus();
  };

    const getAllTasks = async () => {
      try{
        const task = await axios.get(url);
        setAllTasks(task.data)
           console.log(task.data);
      }catch (error) {
        console.log('Error fetching tasks:', error);
      }
    }

    useEffect(() => {
      getAllTasks();
    }, []);
  return (
    <section className='w-full flex flex-col h-screen p-10 bg-gray-100 gap-10'>
        <div className='flex justify-between' onClick={ ()=> setShowAddOptions(false)}>
          <div className='flex justify-between gap-3'>
          { !showMenu && (
                  <MenuIcon className='cursor-pointer hover:text-gray-600' style={{ fontSize: 28 }} onClick={()=> setShowMenu(true)}/> )
          }
          <div className='flex flex-col gap-2'>
          <h1 className='flex gap-2 font-semibold text-xl'> {showMenu && <FiSun size={27}/>} My Day</h1>
          <p className='text-b text-gray-400'>Wednesday, December 13 2023</p>
          </div>
          </div>
          <div className='flex gap-5 text-b text-gray-400'>
            <h1 className='flex gap-1 cursor-pointer'> 
                     <SortIcon className=''
                       style={{ fontSize: 20 }}/> 
                       Sort
                       </h1>
                       <h1 className='flex gap-1 cursor-pointer'> 
                       <FaLayerGroup size={18} />
                       Group
                       </h1>
          </div>
        </div>

        <div className='flex flex-col custom-shadow'>
          <div className='py-2 px-5 flex gap-3 w-full bg-white'
           onClick={ ()=> handleAddIconClick()}
           >
            { showAddOptions ?
            <div className='py-2 duration-200'><input type="checkbox" name="" id="" /></div>
              :
            <button className='rounded-full p-1 hover:bg-purple-100 duration-200'>
            <AddIcon style={{ fontSize: 31 }} className='text-purple-500'/>
            </button>}
                <input
                  type="text"
                  ref={inputRef}
                  name=""
                  id=""
                  placeholder="Add a task"
                  className="w-full focus:outline-none font-semibold text-lg text-purple-950 placeholder-gray-300"
                />
          </div>
          { showAddOptions && ( 
          <div className='px-7 flex mr-0 w-full bg-white custom-shadow-two justify-between items-center'>
            <div className='items-center flex gap-3'><Tooltip title="Category">
                  <IconButton>
                    <WidgetsOutlinedIcon className='cursor-pointer text-purple-300 hover:text-purple-600 '
                       style={{ fontSize: 25 }}/> 
                  </IconButton>
              </Tooltip>   
              <Tooltip title="Add due day">
                  <IconButton>
                  <CalendarMonthOutlinedIcon className='cursor-pointer text-purple-300 hover:text-purple-600 duration-200'
          style={{ fontSize: 25 }}/> 
                  </IconButton>
              </Tooltip> 
              <Tooltip title="Remind me">
                  <IconButton>
                  <NotificationsActiveOutlinedIcon className='cursor-pointer text-purple-300 hover:text-purple-600 duration-200'
          style={{ fontSize: 25 }}/> 
                  </IconButton>
              </Tooltip></div>
                <button className='bg-purple-400 py-1 rounded-sm px-3 text-white font-bold hover:bg-purple-600 duration-200'>Add</button>
          </div>)}
        </div>
        <div className='py-2 px-5 flex gap-3 w-full bg-white' onClick={ ()=> setShowAddOptions(false)}>
          
        </div>
    </section>
  )
}

export default ToDoMain