import React, { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

export default function CalendarDropwdown({ handleDuedateSelect }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [date, setDate] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateClick = () => {
    handleDuedateSelect(date);
    handleClose();
  };

  useEffect(()=>{
    handleDateClick();
  },[date]);

  // Function to format the provided timestamp to only include the date
  const formatDate = (timestamp) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(timestamp).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Tooltip title="Add due day" onClick={handleClick}>
        <IconButton>
          <CalendarMonthOutlinedIcon
            className="cursor-pointer text-purple-300 hover:text-purple-600 duration-200"
            style={{ fontSize: 25 }}
          />
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
          <input
            type="date"
            name=""
            id=""
            onChange={(e)=>{
              // Use formatDate to get only the date part
              setDate(formatDate(e.target.value));
            }}
            value={date}
            min={new Date().toISOString().split('T')[0]}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
