import axios from 'axios';
import { useState } from 'react';

export const useTrackHooks = () => {
  const baseUrl = 'http://localhost:5000/api/v1';
  const [success, setSuccess] = useState('');
  const [error, setError] = useState({ error: false, errMessage: '' });
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [tracksData, setTracksData] = useState([]);

  const getAllTracks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/races`);
      if (response) {
        setTracksData(response.data.allRace);
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
        getAllTracks();
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
        getAllTracks();
      }
    } catch (error) {
      console.log(error);
      setRemove(false);
      setError({ error: true, errMessage: error.response.data.msg.message });
    }
  };

  return {
    createNewTracks,
    getAllTracks,
    success,
    error,
    loading,
    tracksData,
    deleteTrack,
    remove,
  };
};
