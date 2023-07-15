import axios from 'axios';
import { useState } from 'react';

export const useBestRacers = () => {
  const baseUrl = 'http://localhost:5000/api/v1';
  const [success, setSuccess] = useState('');
  const [error, setError] = useState({ error: false, errMessage: '' });
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [bestRacers, setBestRacers] = useState([]);
  const [singleTrack, setSingleTrack] = useState([]);

  const getBestRacers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/racers`);
      console.log(response);
      if (response) {
        setBestRacers(response.data.allRacers);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError({ error: true, errMessage: error.response.data.msg.message });
    }
  };

  const createNewTracks = async (formdata) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/races`, formdata);
      if (response) {
        setSuccess('Tracks created succesfully');
        setLoading(false);

        // Refetch all tracks after creating new tracks to update the page
        getBestRacers();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError({ error: true, errMessage: error.response.data.msg.message });
    }
  };

  const deleteTrack = async (trackID) => {
    try {
      setRemove(true);
      // Pass the Id as parameter to delet
      const response = await axios.delete(`${baseUrl}/races/${trackID}`);

      if (response) {
        setSuccess('Tracks created succesfully');
        setRemove(false);

        // Refetch all tracks upon delete
        getBestRacers();
      }
    } catch (error) {
      console.log(error);
      setRemove(false);
      setError({ error: true, errMessage: error.response.data.msg.message });
    }
  };

  return {
    createNewTracks,
    getBestRacers,
    success,
    error,
    loading,
    bestRacers,
    deleteTrack,
    remove,
    singleTrack,
  };
};
