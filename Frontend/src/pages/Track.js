import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTrackHooks } from '../Hooks/trackHooks';
import { ImRoad } from 'react-icons/im';
import { FaLocationArrow } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import './track.css';
import { useBestRacers } from '../Hooks/bestRacersHook';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';

function Track() {
  const { getSingleTrack, singleTrack } = useTrackHooks();

  const { getBestRacers, bestRacers, remove, loading, error, success } =
    useBestRacers();

  console.log(bestRacers);

  const [formData, setformData] = useState({
    trackName: '',
    imageUrl: '',
    location: '',
    miles: '',
  });

  const { imageUrl, location, miles, trackName } = singleTrack;
  const { trackId } = useParams();

  // Fetch single track based on it's id
  useMemo(() => {
    if (trackId) {
      getSingleTrack(trackId);
      getBestRacers();
    }
  }, []);

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
    // createNewTracks(formData);

    // clear input upon submit
    // clearInput();
  };

  //   Delet track from databse based on the id of the cliked track
  const handleDelete = (id) => {
    const trackID = id;
    // deleteTrack(trackID);
  };

  return (
    <main className='seeTrack'>
      <h1> Street Speed way </h1>
      <section className='seeTrackWrapper'>
        <article className='race'>
          <div className='racePic'>
            <img src={imageUrl} alt='' />
          </div>
          <div className='raceDeets'>
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
          </div>
        </article>
      </section>

      <section className='bestRacers'>
        <h1> Street Speedway Racer's Leader Board </h1>
        <section className='racersLeaderboard'>
          <div className='bH'>
            <div className='boardHeader'>
              <small className='rank'> Rank </small>
              <small className='name'> Racer</small>
              <small className='time'> Time </small>
              <small className='car'> Cars </small>
            </div>
          </div>
          <div>
            {bestRacers.map(
              ({ _id, carName, duration, position, racerName }) => (
                <section className='board'>
                  <section className='leader' key={_id}>
                    <p className='rank'> {position} </p>
                    <h4 className='name'> {racerName} </h4>
                    <p className='time'> {duration} </p>
                    <p className='car'> {carName} </p>
                  </section>
                  <div className='Btns'>
                    <div id='BtnF'>
                      <button onClick={() => handleDelete(_id)} className='Btn'>
                        {' '}
                        <FiEdit />
                      </button>
                    </div>
                    <div>
                      <button onClick={() => handleDelete(_id)} className='Btn'>
                        {remove ? 'Deleting... ' : <MdDelete />}
                      </button>
                    </div>
                  </div>
                </section>
              ),
            )}
          </div>
        </section>

        <button onClick={() => handleDelete()} className='addBest'>
          Add Bes Racers
        </button>
      </section>

      {/* Add Best Racers form  */}
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
    </main>
  );
}

export default Track;
