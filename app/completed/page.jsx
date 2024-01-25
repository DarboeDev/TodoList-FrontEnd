"use client";
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';  // Import axios for HTTP requests
import toast from 'react-hot-toast';
import { Tooltip, IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import UndoIcon from '@mui/icons-material/Undo';

import { DataContext } from '../Context/appContext';

const Pages = () => {
  const { showMenu, setShowMenu } = useContext(DataContext);

  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_URL;

  const getAllTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/tasks`);
      const data = response.data;

      const completedTasks = data.filter(task => task.description.completed);
      setAllTasks(completedTasks);
    } catch (error) {
      console.log('Error fetching tasks:', error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const uncompleteTask = async (id) => {
    try {
      const result = await axios.put(`${url}/tasks/${id}`, {
        description: {
          completed: false,
        },
      });
      if (result.status === 200) {
      router.refresh();
 
      }
    } catch (error) {
      console.log(error.message);
    } finally{
      getAllTasks();
      toast.success("Undo Complete");
    }
  };

  if (loading) {  // Check if there are no completed tasks
    return  (
      <div className="w-[70%] mt-[250px] flex justify-center items-align">
          <div className="loader"></div> 
      </div>

    );
  } else {
      if (allTasks?.length === 0) {  // Check if there are no completed tasks
    return  (
      <div className="w-[65%] mt-[250px] flex justify-center items-align">
          <div className="">No Completed Task</div> 
      </div>

    );
  }
    return (
      <section className='w-full flex flex-col p-10 bg-gray-100 gap-10'>
        <div className='flex gap-3'>
          { !showMenu && (
                  <MenuIcon className='cursor-pointer hover:text-gray-600' style={{ fontSize: 28 }} onClick={()=> setShowMenu(true)}/> )
          }
          <div className='flex flex-col gap-2'>
          <h1 className='flex gap-2 font-semibold text-xl'> {showMenu && <TaskAltIcon size={27}/>} Completed Tasks</h1>
          <p className='text-b text-gray-400'>Wednesday, December 13 2023</p>
          </div>
          </div>
        <div className='flex flex-col custom-shadow'>
          <div
            className='py-4 px-5 flex gap-3 flex-col w-full bg-white'
          >
            {allTasks.map((task) => (
              <div
                className='flex justify-between custom-shadow bg-white w-full py-2 px-5'
                key={task._id}
              >
                <div className='flex items-center gap-6 w-full'>
                  <h1>{task.title}</h1>
                </div>
                {/* Additional tooltip section for importance icons */}
                <button className='flex bg-purple-500 gap-2 text-md py-2 px-3 text-white rounded-lg hover:bg-purple-600' 
                 onClick={()=> uncompleteTask(task._id)}>
                <UndoIcon className='cursor-pointer'
                 style={{ fontSize: 22 }} 
                 />
                  Undo
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
};

export default Pages;
