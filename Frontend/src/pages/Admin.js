import React, { useEffect, useState } from 'react';
import { useTrackHooks } from '../Hooks/trackHooks';
import { ImRoad } from 'react-icons/im';
import { FaLocationArrow } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';

function Admin() {
  const [formData, setformData] = useState({
    trackName: '',
    imageUrl: '',
    location: '',
    miles: '',
  });

  const {
    createNewTracks,
    getAllTracks,
    deleteTrack,
    error,
    success,
    loading,
    tracksData,
    remove,
  } = useTrackHooks();

  // Get input field values upon file changes
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  //   Clear input field upon submit
  const clearInput = () => {
    setformData({});
  };

  //   Create Tracks to the database
  const createTracks = (e) => {
    e.preventDefault();

    // Create new track from the inputData
    createNewTracks(formData);

    // clear input upon submit
    clearInput();
  };

  useEffect(() => {
    getAllTracks();
  }, [getAllTracks]);

  //   Delet track from databse based on the id of the cliked track
  const handleDelete = (id) => {
    const trackID = id;
    deleteTrack(trackID);
  };

  return (
    <div className='allTracks'>
      <header>
        <h2> Welcome to admin dashboard where you can create tracks</h2>
      </header>

      <form>
        <div className='trackInput'>
          <label htmlFor='name'>Track name </label>
          <input
            type='text'
            id='trackName'
            name='trackName'
            value={formData.trackName || ''}
            placeholder='enter track name'
            onChange={handleChange}
          />
        </div>
        <div className='trackInput'>
          <label htmlFor='image'>Track Image </label>
          <input
            type='text'
            id='imageUrl'
            name='imageUrl'
            value={formData.imageUrl || ''}
            placeholder='enter track name'
            onChange={handleChange}
          />
        </div>
        <div className='trackInput'>
          <label htmlFor='location'>Track Location </label>
          <input
            type='text'
            id='location'
            name='location'
            value={formData.location || ''}
            placeholder='enter track name'
            onChange={handleChange}
          />
        </div>
        <div className='trackInput'>
          <label htmlFor='miles'>Track miles </label>
          <input
            type='text'
            id='miles'
            name='miles'
            value={formData.miles || ''}
            placeholder='enter track name'
            onChange={handleChange}
          />
        </div>
        <div className='btnWrapper'>
          <button
            disabled={loading}
            type='submit'
            onClick={createTracks}
            className='Btn'
          >
            {loading ? 'adding tracks...' : 'Add Track'}
          </button>
        </div>

        {error ? <span> {error.errMessage} </span> : ''}
        {success ? <span> {success} </span> : ''}
      </form>

      <section className='tracksWrapper'>
        {tracksData.length === 0 ? (
          <p> Loading....</p>
        ) : (
          tracksData.map(({ _id, trackName, location, miles }) => (
            <section className='track' key={_id}>
              <h4>
                {' '}
                <ImRoad color='grey' /> {trackName}
              </h4>
              <p>
                {' '}
                <FaLocationArrow color='grey' /> {location}{' '}
              </p>
              <p>
                {' '}
                <GiPathDistance color='grey' /> {miles}{' '}
              </p>

              <button onClick={() => handleDelete(_id)} className='Btn'>
                {remove ? 'Deleting... ' : <MdDelete /> && 'Delete '}
              </button>
            </section>
          ))
        )}
      </section>
    </div>
  );
}

export default Admin;
