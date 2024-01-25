import * as React from 'react';


export default function CompleteModal({openModal, setOpenModal, id, completeTask}) {

  return (
    <div className='w-full h-screen bg-black/10 flex justify-center items-center fixed left-0 z-50 top-0 custom-shadow '>
    <div className="flex flex-col bg-white px-10 py-6 gap-6">
      <h1 className="text-lg font-semibold">Are you sure you want to complete this task?</h1>
      <div className="flex items-center gap-4">
        <button className='bg-purple-500 text-white px-2 py-1'
        onClick={()=> {
          setOpenModal(false)
          completeTask(id);
        }}
        >Yes, I Agree</button>
        <button className='bg-red-500 text-white px-2 py-1'
         onClick={()=> {
          setOpenModal(false);
        }}
        >No, I Disagree</button>
      </div>
    </div>
  </div>  
  );
}