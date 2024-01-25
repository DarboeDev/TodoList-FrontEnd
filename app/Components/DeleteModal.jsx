import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast';
import {useState } from 'react'

const DeleteModal = ({setDeleteModal, currentTaskID, getAllTasks}) => {
    const [taskID, setTaskId] = useState(currentTaskID);

    const deleteTask = async (id) =>{
        try {
           const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/TASKS/${id}`);
     } catch (error) {
       console.log(error.message);
     } finally{
       toast.success("Task deleted");
       getAllTasks();
     }
   };

   const handleDelete = () => {
    const id = currentTaskID;
    deleteTask(id)
   }


  return (
    <div className='w-full h-screen bg-black/40 flex justify-center items-center fixed left-0 z-50 top-0 custom-shadow '>
    <div className="flex flex-col bg-white px-10 py-6 gap-6">
      <h1 className="text-lg font-semibold">Are you sure you want to delete this task?</h1>
      <div className="flex items-center gap-4">
        <button className='bg-purple-500 text-white px-2 py-1'
        onClick={()=> {
          setDeleteModal(false)
          handleDelete();
        }}
        >Yes, I Agree</button>
        <button className='bg-red-500 text-white px-2 py-1'
         onClick={()=> {
          setDeleteModal(false);
        }}
        >No, I Disagree</button>
      </div>
    </div>
  </div>  
  )
}

export default DeleteModal
