import React, { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import AddIcon from '@mui/icons-material/Add';


export default function CategoryDropdown({ currentTaskID, getAllTasks, handleCategorySelect, allCategories }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (category) => {
    handleCategorySelect(category);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Category" onClick={handleClick}>
        <IconButton>
          <WidgetsOutlinedIcon
            className='cursor-pointer text-purple-300 hover:text-purple-600'
            style={{ fontSize: 25 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'category-button',
        }}
      >
        {allCategories.map((category) => (
          <MenuItem key={category._id} onClick={() => handleCategoryClick(category)}>
            {category.name}
          </MenuItem>         
        ))}
      </Menu>
    </>
  );
}
