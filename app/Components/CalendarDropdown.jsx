import React, { useState,useEffect } from 'react';
import { useRouter, router } from 'next/navigation';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

export default function CalendarDropwdown({ currentTaskID, getAllTasks }) {
const router = useRouter()

  const [anchorEl, setAnchorEl] = useState(null);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setOpenEditModal(true);
    handleClose();
  };

  return (
    <>
       <Tooltip title="Add due day" onClick={handleClick}>
                  <IconButton>
                  <CalendarMonthOutlinedIcon className='cursor-pointer text-purple-300 hover:text-purple-600 duration-200'
          style={{ fontSize: 25 }}/>                   </IconButton>
       </Tooltip> 
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=> {
          setDeleteModal(true); 
            handleClose();

        }}>Tomorrow</MenuItem>
        <MenuItem>In 3 days</MenuItem>
        <MenuItem>Next Week</MenuItem>
        <MenuItem>
           Custom
        </MenuItem>
      </Menu>
    </>
  );
}

