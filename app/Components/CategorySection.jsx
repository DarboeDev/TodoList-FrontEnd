import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';
import CategoryModal from './CategoryModal'; 
import { DeleteOutlined, EditNote } from '@mui/icons-material';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editCategories, setEditCategories] = useState(false);

  const getCategories = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/categories`);
      setCategories(res.data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };


  useEffect(() => {
    getCategories();
  }, []); 

  const handleAddButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCategoryAdd = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

    const deleteCategory = async (id) => {
      try {
        const res = axios.delete(`${process.env.NEXT_PUBLIC_URL}/categories/${id}`);
        getCategories();
      } catch (error) {
        console.log(error.message);
      } finally{
        getCategories();
        toast.success("Category deleted");
      }
    };
  return (
    <div className='w-full pl-6 pr-2 flex flex-col gap-3' >
      <div className='flex w-full justify-between items-center'>
      <h1 className='text-gray-500 font-semibold'>Category</h1>
      <EditNote
       onClick={()=> setEditCategories(!editCategories)}
       style={{ fontSize: 25 }} 
       className='text-purple-500 hover:text-purple-800' />
      </div>
      <ul className='flex flex-col gap-1'>
        {categories.map((category) => (
          <li key={category._id} className='flex gap-2 items-center justify-between'>
            <div className="w-full flex items-center gap-3">
              <div
            className={`w-[10px] h-[10px] rounded-full`}
            style={{
              backgroundColor: category.color,
            }}
            ></div>
            {category.name}
            </div>
            { editCategories && <div className="hover:bg-red-100 rounded-full p-1 flex justify-center items-center">
              <DeleteOutlined 
              onClick={()=> deleteCategory(category._id)}
              style={{ fontSize: 19 }} 
              className='text-red-500'/>
             </div>}
          </li>
        ))}
      </ul>
     { editCategories &&(
      <div className='w-full flex pt-3 justify-center items-center'>          
        <button
          className='w-[80%] items-center justify-center bg-purple-400 rounded-lg hover:bg-purple-500 duration-300'
          onClick={handleAddButtonClick}
        >
          <AddIcon style={{ fontSize: 32 }} className='text-white'/>
        </button>
      </div>)
}
     {openModal && ( 
     <CategoryModal
        isOpen={openModal}
        onClose={handleCloseModal}
        onCategoryAdd={handleCategoryAdd}
      />
      )}
    </div>
  );
};

export default CategorySection;
