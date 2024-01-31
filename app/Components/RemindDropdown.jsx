import React, { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

export default function RemindDropwdown({handleReminderSelect}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [time, setTime] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDateClick = () => {
    handleReminderSelect(time);
    handleClose();
  };
  useEffect(()=>{
    handleDateClick();
    },[time])

  return (
    <>
       <Tooltip title="Remind me" onClick={handleClick}>
                  <IconButton>
                  <NotificationsActiveOutlinedIcon className='cursor-pointer text-purple-300 hover:text-purple-600 duration-200'
          style={{ fontSize: 25 }}/> 
                  </IconButton>
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
        <MenuItem>
         <div className='flex flex-col'>
            <input type="time" name="remind-time" id="remind-time" value={time} onChange={(e)=> setTime(e.target.value)} />
         </div>
        </MenuItem>
      </Menu>
    </>
  );
}

