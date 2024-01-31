import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { DarkModeContext } from '../Context/DarkmodeContext';
import ColourPicker from '../components/ColourPicker'



const CategoryModal = ({ isOpen, onClose, onCategoryAdd }) => {
  const {darkMode} = useContext(DarkModeContext);
  const [categoryName, setCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState(''); 
  const [data, setData] = useState([])
  const [colorOptions, setColorOptions] = useState([
    '#8B5CF6', // Purple
    '#9333EA', // Violet
    '#AB83E1', // Lavender
    '#7C3AED', // Blue Violet
    '#6B7280', // Gray
    '#8B5A2B', // Rust
    '#F59E0B', // Yellow
    '#10B981', // Emerald
    '#3B82F6', // Cornflower Blue
    '#D97706', // Dark Orange
  ])


  const getCategories = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/categories`);
      setData(res.data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };
  useEffect(()=>{
    getCategories();
  },[])

  const existingColors = data.map((category) => category.color);

  const availableColors = colorOptions.filter(
    (color) => !existingColors.includes(color)
  );

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/categories/add`, {
        name: categoryName,
        color: selectedColor,
      });

      // Handle the response and add the new category to the list
      const newCategory = response.data;
      onCategoryAdd(newCategory);

      // Close the modal
      onClose();
    } catch (error) {
      console.log('Error creating category:', error);
    }finally{
  toast.success("Category created successfully");

    }
  };

  return (
    <div className={`w-full h-screen bg-black/70 flex justify-center items-center fixed left-0 z-50 top-0 custom-shadow ${isOpen ? 'block' : 'hidden'}`}>
      <div className={`flex flex-col ${darkMode ? "bg-dark-options" : 'bg-white'} px-10 w-[500px] py-6 gap-8`}>
        <div className='flex justify-between items-center'>
          <h1 className={`text-lg font-semibold ${darkMode && 'text-gray-200'}`}>Create Category</h1>
          <button onClick={onClose}>
            <CancelIcon className='cursor-pointer text-red-400 hover:text-red-500' style={{ fontSize: 25 }} />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className='flex gap-2 items-center'>
            <h1 className={`text-md font-medium ${darkMode && 'text-gray-200'}`}>Category Name:</h1>
            <input
            className={`bg-gray-100 px-3 ${!darkMode ? '' : 'bg-dark-task text-white'} rounded-xl py-2 w-full focus:outline-none border-purple-400 border-2`}
                                          type="text"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className='flex gap-2 items-center'>
            <h1 className={`text-md font-medium ${darkMode && 'text-gray-200'}`}>Category Color:</h1>
            <div className='flex gap-2 items-center'>
              {availableColors.map((color) => (
                <div
                  key={color}
                  className={`color-option rounded-full ${selectedColor === color ? 'border-2 ' : ''}`}
                  style={{
                    backgroundColor: color,
                    width: selectedColor === color ? '21px' : '20px',
                    height: selectedColor === color ? '21px' : '20px',
                    borderColor: darkMode ? 'white' : 'black',
                  }}
                  onClick={() => {setSelectedColor(color); }}
                ></div>
              ))}
               <ColourPicker setColorOptions={setColorOptions} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
            </div>
          </div>
          <button
            className='bg-purple-500 rounded-lg px-2 py-1 text-white hover:bg-purple-600'
            onClick={handleAddCategory}
          >
            <AddIcon style={{ fontSize: 20 }} className='text-white mr-2' />
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
