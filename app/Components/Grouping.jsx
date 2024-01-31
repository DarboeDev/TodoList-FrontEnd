import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTaskContext } from '../Context/getDataContext';
import { FaLayerGroup } from "react-icons/fa";
import axios from 'axios';


export default function CategoryDropdown() {
  const { allTasks, setAllTasks, getAllTasks, allCategories } = useTaskContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGroupClick = (group) => {
    updateTasks(group);
    handleClose();
  };

  const updateTasks = async (group) => {
    if (group === 'all') {
      getAllTasks();
    } else {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/tasks`);
        const data = response.data;
        const filteredTasks = data.filter((task) => task.description.category === group);
        setAllTasks(filteredTasks);
      } catch (error) {
        console.log('Error fetching tasks:', error);
      }    
    }
  };

  return (
    <>
      <h1 onClick={handleClick} className='flex gap-1 cursor-pointer items center text-md'>
        <FaLayerGroup size={18} />
        Group
      </h1>
      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'category-button',
        }}
      >
        <MenuItem key="all" onClick={() => handleGroupClick('all')}>
          All
        </MenuItem>
        {allCategories.map((category) => (
          <MenuItem onClick={() => handleGroupClick(category._id)} key={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
