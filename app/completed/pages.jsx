"use client"
import {useState, useRef, useEffect } from 'react'
import React from 'react';
const axios = require('axios');
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const Completed = () => {

  const [completedTask, setCompletedTask] = useState();

  const getAllTasks = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/`);
      const data = response.data;
  
      // Filter tasks with completed: true
      const uncompletedTasks = data.filter(task => task.description.completed);
      setCompletedTask(uncompletedTasks);
    } catch (error) {
      console.log('Error fetching tasks:', error);
    }
  };
  useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <div className='flex gap-2 w-full flex-col justify-center items-center' onClick={ ()=> setShowAddOptions(false)}>
    {completedTask && completedTask.map(task => (
             <div className='flex justify-between custom-shadow bg-white w-full py-2 px-5' key={task._id}>
               <div className='flex items-center gap-6 w-full'>
                 <input type="checkbox" name="done" id="done" className='px-3'
                 onClick={()=> completeTask(task._id)} />
                 <h1>{task.title}</h1>
               </div>
               {
                 task.description.importance === false ? (
                   <Tooltip title="Mark task as important" onClick={()=> addFav(task._id)} >
                   <IconButton>
                   <StarBorderIcon className='cursor-pointer text-purple-600'
                        style={{ fontSize: 25 }}/> 
                   </IconButton>
                  </Tooltip> 
                 ) 
                 :
                 ( 
                   <Tooltip title="Remove as important" onClick={()=> removeFav(task._id)}>
                   <IconButton>
                   <StarIcon className='cursor-pointer text-purple-600'
                        style={{ fontSize: 25 }}/> 
                   </IconButton>
                  </Tooltip> 
                 )
               }
              {/* <Tooltip title="Delete task">
                   <IconButton>
                   <DeleteOutlineOutlinedIcon className='cursor-pointer text-red-500'
                        style={{ fontSize: 25 }}/> 
                   </IconButton>
                  </Tooltip>  */}
             </div>
           ))}
   </div>
  )
}

export default Completed