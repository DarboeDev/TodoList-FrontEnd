import React, { useState, useEffect, useContext } from 'react';
import { useRouter, router } from 'next/navigation';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { DarkModeContext } from '../Context/DarkmodeContext';


export default function Dropdown({ setOpenModal, currentTaskID, getAllTasks }) {

  const {darkMode} = useContext(DarkModeContext);

const router = useRouter()

  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);



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
      <Tooltip title="More" onClick={handleClick}>
        <IconButton>
          <MoreVertIcon
            className='cursor-pointer text-purple-500 hover:text-purple-600'
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
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={()=> {
          setDeleteModal(true); 
            handleClose();
            console.log("Dropdown: "  + currentTaskID)

        }}>Delete</MenuItem>
        <MenuItem
        onClick={()=> {
          setOpenModal(true);
          handleClose();
        }}
        >Complete</MenuItem>
      </Menu>
      {openEditModal && (
        <EditModal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          currentTaskID={currentTaskID}
          getAllTasks={getAllTasks}
        />
      )}
    {deleteModal && (
        <DeleteModal
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          currentTaskID={currentTaskID}
          getAllTasks={getAllTasks}
        />
      )}
    </>
  );
}
