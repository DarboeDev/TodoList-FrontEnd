import React, { useState, useContext, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { DarkModeContext } from '../Context/DarkmodeContext';
import { SwatchesPicker } from 'react-color';
import AddCircleIcon from '@mui/icons-material/AddCircle';


export default function ColourPicker({ selectedColor, setSelectedColor, setColorOptions}) {
  const {darkMode} = useContext(DarkModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [color, setColor] = useState("")
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };




  return (
    <>
      <Tooltip title="Choose Color">
        <IconButton onClick={handleClick}>
        <AddCircleIcon className='text-2xl text-purple-300 hover:text-purple-400'/>
        </IconButton>
      </Tooltip>
      <Menu
        id="color-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'color-button',
        }}
      >
        <MenuItem>
          <SwatchesPicker
            color={selectedColor}
            onChange={(color) => setColor(color.hex)}

          />
        </MenuItem>
        <MenuItem>
  <button
    onClick={() => {
      setSelectedColor(color);
      handleClose();
      setColorOptions((prevData) => [...prevData, color]); // Corrected this line
    }}
    className="bg-purple-500 text-white w-full font-bold flex justify-center items-center pt-1 rounded-lg"
  >
    Select
  </button>
</MenuItem>

      </Menu>
    </>
  );
}
