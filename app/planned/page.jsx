"use client"
import { useState, useRef, useEffect, useContext } from 'react';
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Grouping from '../Components/Grouping';
import CalendarDropwdown from '../Components/CalendarDropdown';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { DarkModeContext } from '../Context/DarkmodeContext';
import CategoryDropdown from '../Components/CategoryDropdown';
import CompleteModal from '../Components/CompleteModal';
import Dropdown from '../Components/Dropdown';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { DataContext } from '../Context/appContext';
import {useTaskContext} from '../Context/getDataContext'
import RemindDropwdown from '../Components/RemindDropdown';



const Page = () => {
  const {   setAllCategories, allCategories, getCategories, addFav, completeTask } = useTaskContext();
  const { showMenu, setShowMenu } = useContext(DataContext);
  const [openModal, setOpenModal] = useState(false);
  const [allTasks, setAllTasks] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [chosenDate, setChosenDate] = useState("");

  const {darkMode} = useContext(DarkModeContext);

  const [currentTaskID, setCurrentTaskID] = useState('');
  const router = useRouter();

  const [showAddOptions, setShowAddOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: {
      importance: false,
    },
  });
  
    const inputRef = useRef(null);
  
      const handleAddIconClick = () => {
      setShowAddOptions(true);
      inputRef.current.focus();
    };
  
  const handleChange=(e)=>{
    const {name,value}=e.target
    setNewTask({...newTask,[name]:value})
  }
  
     
   const handleCategorySelect = (category) => {
    // Update the newTask state with the selected category
    setNewTask((prevTask) => ({
      ...prevTask,
      description: {
        ...prevTask.description,
        category: category._id,
      },
    }));
  };
  
  
  const handleDuedateSelect = (date) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      description: {
        ...prevTask.description,
        duedate: date,
      },
    }));
  };
  const handleReminderSelect = (time) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      description: {
        ...prevTask.description,
        remindTime: time,
      },
    }));
  };
  
    
    
  
  const getAllTasks = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/tasks`);
      const data = response.data;

      // Filter tasks with completed: false
      const planned = data.filter(task => task.description.duedate);
     setAllTasks(planned);
    } catch (error) {
      console.log('Error fetching tasks:', error);
    }

  };
  useEffect(()=>{
    getAllTasks();
  },[])

  const getCategoryColor = (categoryId) => {
    const category = allCategories.find((category) => category._id === categoryId);
    return category ? category.color : '';
  };

  const addTask = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/tasks`, newTask).then(() => {
        toast.success("Task Added");
        router.refresh();
        getAllTasks();
        setNewTask({ title: "", description: { importance: false } });
      });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (allTasks.length == null) {
    return (
      <div className="w-[80%] mt-[250px] flex justify-center items-align">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <section className={darkMode ? 'w-full min-h-screen flex flex-col p-10 bg-main-dark gap-10' :'w-full min-h-screen flex flex-col p-10 bg-gray-100 gap-10'}>
      <div className="flex justify-between" onClick={() => setShowAddOptions(false)}>
          <div className="flex justify-between gap-3">
          { !showMenu && (
                  <MenuIcon 
                  className={`ml-6 cursor-pointer ${darkMode ? 'text-gray-200 hover:text-gray-300' : 'text-black hover:text-gray-600'}`}

                  style={{ fontSize: 28 }} 
                  onClick={()=> setShowMenu(true)}/> )
          }
            <div className="flex flex-col gap-2">
            <h1 className={darkMode? "text-white flex gap-2 font-semibold text-xl" : 'text-black flex gap-2 font-semibold text-xl'}>
                {showMenu && <StarOutlineIcon style={{ fontSize: 25 }} />}Planned Tasks
              </h1>
              <p className="text-b text-gray-400">{moment().format('MMMM Do YYYY, h:mm a')}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col custom-shadow">
        <div className={darkMode ? 'py-2 px-5 flex gap-3 w-full bg-dark-sidebar' :'py-2 px-5 flex gap-3 w-full bg-white'}
            onClick={() => handleAddIconClick()}
          >
            {showAddOptions ? (
              <div className="py-2 duration-200">
                <input type="checkbox" name="" id="" />
              </div>
            ) : (
              <button className="rounded-full p-1 hover:bg-purple-100 duration-200">
                <AddIcon style={{ fontSize: 31 }} className="text-purple-500" />
              </button>
            )}
            <input
              type="text"
              ref={inputRef}
              value={newTask.title}
              onChange={handleChange}
              name="title"
              id="title"
              placeholder="Add a task"
              className={`w-full focus:outline-none font-semibold text-lg ${darkMode ? 'bg-dark-sidebar text-gray-300 ' : 'bg-white text-purple-950 ' } placeholder-gray-300`}
              />
            {newTask.description.importance === false ? (
              <Tooltip
                title="Mark task as important"
                onClick={() => setNewTask({ ...newTask, description: { importance: true } })}
              >
                <IconButton>
                  <StarBorderIcon
                    className="cursor-pointer text-purple-600"
                    style={{ fontSize: 25 }}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip
                title="Remove as important"
                onClick={() => setNewTask({ ...newTask, description: { importance: false } })}
              >
                <IconButton>
                  <StarIcon className="cursor-pointer text-purple-600" style={{ fontSize: 25 }} />
                </IconButton>
              </Tooltip>
            )}
          </div>
          { showAddOptions && ( 
          <div className={`px-7 flex mr-0 w-full py-1 ${darkMode ? 'bg-dark-options border-t border-solid border-gray-600' : 'bg-white custom-shadow-two'} justify-between items-center`}>
            <div className='items-center flex gap-3'>
            <CategoryDropdown
            setSelectedCategory={setSelectedCategory}
            handleCategorySelect={handleCategorySelect}
            allCategories={allCategories}
            setAllCategories={setAllCategories}
          />               
          <CalendarDropwdown handleDuedateSelect={handleDuedateSelect} chosenDate={chosenDate} setChosenDate={setChosenDate} />
             <RemindDropwdown handleReminderSelect={handleReminderSelect} />
             </div>
              <button
  className={`bg-purple-500 py-1 rounded-sm px-3 text-white font-bold ${
    newTask.lenght === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600 duration-200'
  }`}
  onClick={() => {
    addTask();
  }}
  disabled={newTask.length === 0 || loading}
>
  Add
</button>
            </div>
          )}
        </div>

        <div className="flex gap-2 w-full flex-col justify-center items-center" onClick={() => setShowAddOptions(false)}>
          {allTasks &&
            allTasks.map((task) => (
              <div
              className={`flex justify-between custom-shadow ${darkMode ? 'bg-dark-task' : 'bg-white'} w-full py-2 px-5 rounded`}
              key={task._id}
                onClick={() => setCurrentTaskID(task._id)}
                style={{
                  borderLeft: task.description.category
                    ? `5px solid ${getCategoryColor(task.description.category)}`
                    : '5px solid transparent',
                }}
              >
                <div className="flex items-center gap-6 w-full justify-between">
                  {openModal && (
                    <CompleteModal
                      completeTask={completeTask}
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      id={currentTaskID}
                    />
                  )}
                 <h1 className={darkMode ? 'text-white' : ""}>{task.title}</h1>
                 {
                      task.description.duedate && (
                        <h3 
                        className={`w-[150px] justify-center flex items-center ${darkMode ? 'text-white' : ""} bg-gray-100/20 rounded-xl mr-10`}>
                       Due: {task.description.duedate}</h3>
                      )
                    }
                </div>
                {task.description.importance === false ? (
                  <Tooltip title="Mark task as important" onClick={() => addFav(task._id)} arrow>
                    <IconButton>
                      <StarBorderIcon
                        className="cursor-pointer text-purple-600"
                        style={{ fontSize: 25 }}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Remove as important" onClick={() => removeFav(task._id)}>
                    <IconButton>
                      <StarIcon
                        className="cursor-pointer text-purple-600"
                        style={{ fontSize: 25 }}
                      />
                    </IconButton>
                  </Tooltip>
                )}
                <Dropdown currentTaskID={currentTaskID} getAllTasks={getAllTasks} />
              </div>
            ))}
        </div>
      </section>
    );
  }
};

export default Page;
