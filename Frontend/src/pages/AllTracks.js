import React, { useEffect } from 'react';
import { useTrackHooks } from '../Hooks/trackHooks';
import { ImRoad } from 'react-icons/im';
import { Link } from 'react-router-dom';

function AllTracks() {
  const { getAllTracks, tracksData } = useTrackHooks();

  useEffect(() => {
    getAllTracks();
  }, [getAllTracks]);

  return (
    <main className='seeTracks'>
      <h1> Available Racing Roadways </h1>
      <section className='seeTracksWrapper'>
        {!tracksData || tracksData.length === 0 ? (
          <p> Loading....</p>
        ) : (
          tracksData.map(({ _id, trackName, imageUrl }) => (
            <Link to={`/racer/${_id}`} className='races' key={_id}>
              <div className='raceImage'>
                <img src={imageUrl} alt='' />
              </div>
              <h4>
                {' '}
                <ImRoad color='grey' /> {trackName}
              </h4>
            </Link>
          ))
        )}
      </section>
    </main>
  );
}

export default AllTracks;
