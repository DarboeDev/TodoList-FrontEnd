"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const getAllTasks = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/tasks`);
      const data = response.data;

      // Filter tasks with completed: false
      const uncompletedTasks = data.filter((task) => !task.description.completed).reverse();
      setAllTasks(uncompletedTasks);
    } catch (error) {
      console.log('Error fetching tasks:', error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/categories`);
      setAllCategories(res.data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const addFav = async (id) => {
    try {
      const result = await axios.put(`${process.env.NEXT_PUBLIC_URL}/tasks/${id}`, {
        description: {
          importance: true,
        },
      });
      if (result.status === 200) {
        getAllTasks();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const completeTask = async (id) => {
    try {
      const result = await axios.put(`${process.env.NEXT_PUBLIC_URL}/tasks/${id}`, {
        description: {
          completed: true,
        },
      });
      if (result.status === 200) {
        getAllTasks();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeFav = async (id) => {
    try {
      const result = await axios.put(`${process.env.NEXT_PUBLIC_URL}/tasks/${id}`, {
        description: {
          importance: false,
        },
      });
      if (result.status === 200) {
        getAllTasks();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllTasks();
    getCategories();
  }, []);

  return (
    <TaskContext.Provider value={{ allTasks, allCategories, setAllCategories, getAllTasks, getCategories, addFav, completeTask, removeFav }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
