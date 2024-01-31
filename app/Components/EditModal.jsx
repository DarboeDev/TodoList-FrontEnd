import React, { useState, useEffect, useContext } from 'react'
import Tooltip from '@mui/material/Tooltip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import toast from 'react-hot-toast';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DarkModeContext } from '../Context/DarkmodeContext';



const EditModal = ({ setOpenEditModal, currentTaskID, getAllTasks}) => {  
    const {darkMode} = useContext(DarkModeContext);


    const router = useRouter();

    const closeEditModal  = ()=>{
        setOpenEditModal(false);
        }


    const [taskTitle, setTaskTitle] = useState("");
    const [importance, setImportance] =useState(false);
    const [complete, setComplete] = useState(false);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const getTask = async (currentTaskID) =>{
        setLoading(true);
        console.log(currentTaskID);
        if(currentTaskID){
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/tasks/${currentTaskID}`);
                const taskData = response.data
                console.log(taskData)
                setTaskTitle(taskData?.title)
                setImportance(taskData.description?.importance)
                setComplete(taskData.description?.complete)
                setCategory(taskData.description?.category)
                console.log(taskTitle)
            } catch (error) {
                console.log('Error fetching tasks:', error);
            }finally{
                setLoading(false)
            }
        }
      }

      useEffect(()=>{
      getTask(currentTaskID);
      },[currentTaskID]);


   
      const completeEdit = async (id) =>{
        try {
             const result = await axios.put(
                 `${process.env.NEXT_PUBLIC_URL}/tasks/${id}`,
                 {
                     title: taskTitle,
                     description: { importance: importance, complete: complete, category: category},
                 }
             );
 
             if (result.status === 200) {
                 router.refresh();
             }
         } catch (error) {
             console.log(error.message);
         } 
         finally{
        toast.success("Task Edited!");
         }
         getAllTasks();

     };

      
{
         return (
        <div className='w-full h-screen bg-black/80 flex justify-center items-center fixed left-0 z-50 top-0 custom-shadow '>
    <div className={`flex flex-col ${darkMode ? "bg-dark-options" : 'bg-white'} px-10 w-[500px] py-6 gap-8`}>
     { loading ? (
             <div className="w-[100%] h-[100%] flex justify-center items-align">
             <div className="loader flex justify-center items-align">
            </div> 
            </div>
            )
            :
             ( <><div className='flex justify-between items-center'>
                              <h1 className={`text-lg font-semibold ${darkMode && 'text-gray-200'}`}>Edit Task</h1>
                              <button onClick={() => {
                                 closeEditModal()
                             }}>
                                  <CancelIcon className='cursor-pointer text-red-400 hover:text-red-500'
                                      style={{ fontSize: 25 }} />
                              </button>
                          </div><div className="flex gap-4 flex-col">
                                  <div className='flex gap-2 items-center'>
                                      <h1 className={`text-md font-medium ${darkMode && 'text-gray-200'}`}>Title:</h1>
                                      <input
                                          className={`bg-gray-100 px-3 ${!darkMode ? '' : 'bg-dark-task text-white'} rounded-xl py-2 w-full focus:outline-none border-purple-400 border-2`}
                                          type="text"
                                          name="title"
                                          id="title"
                                          value={taskTitle}
                                          onChange={(e)=> setTaskTitle(e.target.value)}
                                          />
 
                                  </div>
 
                                  <div className='flex justify-between items-center px-12'>
                                      <div>
                                          <h1 className={`text-md font-medium ${darkMode && 'text-gray-200'}`}>Important:</h1>
                   {
                       importance === false ? (
                         <button onClick={()=>{ 
                             setImportance(true);
                         }}>
 
                        <StarBorderIcon className='cursor-pointer text-purple-600'
                              style={{ fontSize: 25 }}/> 
                         </button>
                        
                       ) 
                       :
                       ( 
                         <button onClick={()=>{ 
                             setImportance(false);
                         }}>
 
                        <StarIcon className='cursor-pointer text-purple-600'
                              style={{ fontSize: 25 }}/> 
                         </button>
                       )
                     }
                                      </div>
 
 
                                      <div>
                                          <h1 className={`text-md font-medium ${darkMode && 'text-gray-200'}`}>Complete:</h1>
                                          <Tooltip title="Complete Task" arrow onClick={()=> setComplete(true)}>
                                              <CheckCircleIcon className='text-purple-300 hover:text-purple-500'
                                                  style={{ fontSize: 25 }} />
                                          </Tooltip>
                                      </div>
 
                                  </div>
                                  <button className={`bg-purple-500 rounded-lg px-2 py-1 text-white ${darkMode && 'text-gray-200'} hover:bg-purple-600`}
       onClick={()=> {
        completeEdit(currentTaskID);
        closeEditModal();}}
       >Complete</button>
                              </div></>)
      }
    </div>
    </div>
  )
}
}

export default EditModal


 