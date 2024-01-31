import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast';
import {useState, useContext } from 'react'
import { DarkModeContext } from '../Context/DarkmodeContext';

const DeleteCategory = ({ id, deleteCategory, setDeleteModal}) => {
  const {darkMode} = useContext(DarkModeContext);


   const handleDelete = () => {
    deleteCategory(id);
   }


  return (
    <div className='w-full h-screen bg-black/30 flex justify-center items-center fixed left-0 z-50 top-0 custom-shadow '>
    <div className={`flex flex-col ${darkMode ? "bg-dark-options" : 'bg-white'} px-10 py-6 gap-6`}>
      <h1 className={`text-lg ${darkMode && 'text-gray-200'} font-semibold`}>Are you sure you want to delete this category?</h1>
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

export default DeleteCategory
