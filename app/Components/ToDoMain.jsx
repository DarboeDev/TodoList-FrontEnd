import {useState } from 'react'
import React from 'react'
import { FiSun } from "react-icons/fi";
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

const ToDoMain = ({showMenu, setShowMenu}) => {
  const [showAddOptions, setShowAddOptions] = useState(false);
  return (
    <section className='w-full flex flex-col h-screen p-10 bg-gray-100 gap-10'>
        <div className='flex justify-between'>
          <div className='flex justify-between gap-5'>
          { !showMenu && (
                  <MenuIcon className='cursor-pointer hover:text-gray-600' style={{ fontSize: 28 }} onClick={()=> setShowMenu(true)}/> )
          }
          <div className='flex flex-col gap-2'>
          <h1 className='flex gap-2 font-semibold text-xl'> {showMenu && <FiSun size={27}/>} My Day</h1>
          <p className='text-b text-gray-400'>Wednesday, December 13 2023</p>
          </div>
          </div>
          <div className='flex gap-5 text-b text-gray-400'>
            <h1>Sort</h1>
            <h1>Group</h1>
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='custom-shadow py-2 px-5 rounded-md flex gap-3 w-full bg-white' onClick={()=> setShowAddOptions(true)}>
            <button className='rounded-full p-1 hover:bg-purple-100 duration-200'>
            <AddIcon style={{ fontSize: 31, color: 'purple' }}/>
            </button>
             <input type="text" name="" id="" placeholder='Add a task' className='w-full focus:outline-none font-semibold text-lg text-purple-950' />
          </div>
         { showAddOptions && ( <div className='flex w-[300px] py-8 custom-shadow h-[50px] duration-400 '>
             
          </div>)}
        </div>
    </section>
  )
}

export default ToDoMain