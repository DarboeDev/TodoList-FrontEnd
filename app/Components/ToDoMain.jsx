import {useState, useRef, useEffect, useContext } from 'react'
import React from 'react';
const axios = require('axios');
import { FiSun } from "react-icons/fi";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import SortIcon from '@mui/icons-material/Sort';
import { FaLayerGroup } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { DataContext } from '../Context/appContext';

const ToDoMain = () => {

  const {showMenu,setShowMenu } = useContext(DataContext);


  const router = useRouter();

  const [showAddOptions, setShowAddOptions] = useState(false);
  const [allTasks, setAllTasks] = useState({});
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description:{
      importance: false,
    },
});
  const url = process.env.NEXT_PUBLIC_URL;
console.log(url); 
  const inputRef = useRef(null);

    const handleAddIconClick = () => {
    setShowAddOptions(true);
    inputRef.current.focus();
  };

const handleChange=(e)=>{
  const {name,value}=e.target
  setNewTask({...newTask,[name]:value})
}
const getAllTasks = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/`);
    const data = response.data;

    // Filter tasks with completed: false
    const uncompletedTasks = data.filter(task => !task.description.completed);
   setAllTasks(uncompletedTasks)
    console.log(uncompletedTasks);
  } catch (error) {
    console.log('Error fetching tasks:', error);
  }
};


    useEffect(() => {
      getAllTasks();
    }, []);

   const  addFav = async (id) => {
     try {
     const result = await axios.put(`${process.env.NEXT_PUBLIC_URL}/${id}`,{
        description: {
            importance: true,
            // "completed": false                                             
        }},)
       if(result.status === 200){
        router.refresh();
        getAllTasks();
       }
    } catch (error) {
      console.log(error.message);
    } finally{
      toast.success("Added to favorites");
    }
  };
  const completeTask = async (id) => {
    try {
    const result =  await axios.put(`${process.env.NEXT_PUBLIC_URL}/${id}`,{
        description: {
            completed: true                                             
        }},);
       if(result.status ===200){
        router.refresh();
        getAllTasks();
       }
         
    } catch (error) {
      console.log(error.message);
    } finally{
      toast.success("Task completed");
      
    }
}
  const  removeFav = async (id) => {
    try {
    const result =  await axios.put(`${process.env.NEXT_PUBLIC_URL}/${id}`,{
       description: {
           importance: false,
           // "completed": false                                             
       }},)
       if(result.status === 200){
        router.refresh();
        getAllTasks();
       }
   } catch (error) {
     console.log(error.message);
   } finally{
     toast.success("Removed from favorites");
     
   }
 };


  
    const addTask = async () => {
        try{
          setLoading(true);
          await axios.post(`${process.env.NEXT_PUBLIC_URL}/task`, newTask).then(()=>{
            toast.success("Task Added");
            router.refresh();
            getAllTasks();
            setNewTask({title:"",description:{importance:false}})
          });
          
        }catch(error){
            toast.error("Something went wrong")
        }finally{
          setLoading(false);
        }
    }
    if(allTasks.length == null){
      return  (
        <div className="w-[80%] mt-[250px] flex justify-center items-align">
            <div className="loader"></div> 
        </div>
      );
    }else{
  return (
    <section className='w-full flex flex-col p-10 bg-gray-100 gap-10'>
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
            <div className='py-2 duration-200'>
              <input type="checkbox" name="" id=""/>
              </div>
              :
            <button className='rounded-full p-1 hover:bg-purple-100 duration-200'>
            <AddIcon style={{ fontSize: 31 }} className='text-purple-500'/>
            </button>}
                <input
                  type="text"
                  ref={inputRef}
                  value={newTask.title}
                  onChange={handleChange}
                  name="title"
                  id="title"
                  placeholder="Add a task"
                  className="w-full focus:outline-none font-semibold text-lg text-purple-950 placeholder-gray-300"
                />
                { newTask.description.importance == false ?
                  <Tooltip title="Mark task as important"
                   onClick={()=> setNewTask({...newTask,description:{importance:true}})} >
                        <IconButton>
                        <StarBorderIcon className='cursor-pointer text-purple-600'
                             style={{ fontSize: 25 }}/> 
                        </IconButton>
                       </Tooltip> 
                      :
                      (
                        <Tooltip title="Remove as important"
                         onClick={()=> setNewTask({...newTask,description:{importance:false}})}>
                        <IconButton>
                        <StarIcon className='cursor-pointer text-purple-600'
                             style={{ fontSize: 25 }}/> 
                        </IconButton>
                       </Tooltip> 
                      )
                      }
          </div>
          { showAddOptions && ( 
          <div className='px-7 flex mr-0 w-full bg-white custom-shadow-two justify-between items-center'>
            <div className='items-center flex gap-3'>
              <Tooltip title="Category">
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
              <button
  className={`bg-purple-500 py-1 rounded-sm px-3 text-white font-bold ${
    newTask.lenght === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600 duration-200'
  }`}
  onClick={() => addTask()}
  disabled={newTask.lenght === 0 || loading}
>
  Add
</button>
          </div>)}
        </div>

        <div className='flex gap-2 w-full flex-col justify-center items-center' onClick={ ()=> setShowAddOptions(false)}>
         {allTasks && allTasks.map(task => (
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
    </section>
  )
                  }
}

export default ToDoMain