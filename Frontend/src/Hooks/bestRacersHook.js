import axios from 'axios';
import { useState } from 'react';

export const useBestRacers = () => {
  const baseUrl = 'http://localhost:5000/api/v1';
  const [success, setSuccess] = useState('');
  const [error, setError] = useState({ error: false, errMessage: '' });
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [bestRacers, setBestRacers] = useState([]);
  const [editRacer, setEditRacer] = useState([]);

  const getAllBestRacers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/racers`);
      if (response) {
        setBestRacers(response.data.allRacers);
      }
    } catch (error) {
      console.log('Error:', error); // Log the error object to the console
      console.log('Error Message:', error.message); // Log the specific error message to the console

      setLoading(false);
      setError({
        error: true,
        errMessage:
          error.response && error.response.data
            ? error.response.data.msg.message
            : error.message,
      });
    }
  };
  const getBestRacers = async (racerId) => {
    try {
      const response = await axios.get(`${baseUrl}/racers/${racerId}`);
      if (response) {
        setEditRacer(response.data.racer);
      }
    } catch (error) {
      console.log('Error:', error); // Log the error object to the console
      console.log('Error Message:', error.message); // Log the specific error message to the console

      setLoading(false);
      setError({
        error: true,
        errMessage:
          error.response && error.response.data
            ? error.response.data.msg.message
            : error.message,
      });
    }
  };

  const addBestRacer = async (formdata) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/racers`, formdata);
      if (response) {
        setSuccess('Best racer added succesfully');

        // The message will disappear after 3s
        setTimeout(() => {
          setSuccess('');
        }, 3000);
        setLoading(false);

        // Refetch all tracks after creating new tracks to update the page
        getAllBestRacers();
      }
    } catch (error) {
      console.log('Error:', error); // Log the error object to the console
      console.log('Error Message:', error.message); // Log the specific error message to the console
      console.log(error);
      setLoading(false);
      setError({
        error: true,
        errMessage:
          error.response && error.response.data
            ? error.response.data.msg.message
            : error.message,
      });
    }
  };

  const editBestRacer = async (racerId, formdata) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${baseUrl}/racers/${racerId}`,
        formdata,
      );
      if (response) {
        setSuccess('Best racer updated succesfully');

        // The message will disappear after 3s
        setTimeout(() => {
          setSuccess('');
        }, 3000);
        setLoading(false);

        // Refetch all tracks after creating new tracks to update the page
        getAllBestRacers();
      }
    } catch (error) {
      setLoading(false);
      setError({
        error: true,
        errMessage:
          error.response && error.response.data
            ? error.response.data.msg.message
            : error.message,
      });
    }
  };

  const deleteBestRacer = async (trackID) => {
    try {
      setRemove(true);
      // Pass the Id as parameter to delet
      const response = await axios.delete(`${baseUrl}/racers/${trackID}`);

      if (response) {
        setSuccess('Racer deleted succesfully');
        setRemove(false);

        // The message will disappear after 3s
        setTimeout(() => {
          setSuccess('');
        }, 3000);

        // Refetch all tracks upon delete
        getAllBestRacers();
      }
    } catch (error) {
      console.log(error);
      setRemove(false);
      setError({
        error: true,
        errMessage:
          error.response && error.response.data
            ? error.response.data.msg.message
            : error.message,
      });
    }
  };

  return {
    addBestRacer,
    getAllBestRacers,
    getBestRacers,
    success,
    error,
    loading,
    bestRacers,
    editRacer,
    deleteBestRacer,
    editBestRacer,
    remove,
  };
};
