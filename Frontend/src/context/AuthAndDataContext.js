import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Base_url = process.env.REACT_APP_BACKEND_URL;
const AuthAndDataContext = createContext();

export const AuthAndDataProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const createData = async (dataToCreate, type) => {
    try {
      const response = await axios.post(`${Base_url}/create/${type}`, dataToCreate);
      toast.success('Data created successfully!');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error creating data:', error);
      toast.error(error.response?.data?.message || 'Error occurred while creating data.');
      return { success: false, error };
    }
  };

  const fetchData = async (type) => {
    try {
      const response = await axios.get(`${Base_url}/fetch/${type}`);
      toast.success('Data fetched successfully!');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error(error.response?.data?.message || 'Error occurred while fetching data.');
      return { success: false, error };
    }
  };

  const updateData = async (id, updatedData, type) => {
    try {
      const response = await axios.patch(`${Base_url}/update/${type}/${id}`, updatedData);
      toast.success('Data updated successfully!');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error(error.response?.data?.message || 'Error occurred while updating data.');
      return { success: false, error };
    }
  };

  const deleteData = async (id, type) => {
    try {
      const response = await axios.delete(`${Base_url}/delete/${type}/${id}`);
      toast.success('Data deleted successfully!');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error(error.response?.data?.message || 'Error occurred while deleting data.');
      return { success: false, error };
    }
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    toast.success('Logged in successfully!');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    toast.success('Logged out successfully!');
  };

  return (
    <AuthAndDataContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        createData,
        fetchData,
        updateData,
        deleteData,
      }}
    >
      {children}
    </AuthAndDataContext.Provider>
  );
};

export const useAuthAndData = () => useContext(AuthAndDataContext);
