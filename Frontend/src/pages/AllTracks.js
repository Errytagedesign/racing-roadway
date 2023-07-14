import React, { useEffect } from 'react';
import { useTrackHooks } from '../Hooks/trackHooks';
import { ImRoad } from 'react-icons/im';
import { FaLocationArrow } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';

function AllTracks() {
  const { getAllTracks, tracksData } = useTrackHooks();

  useEffect(() => {
    getAllTracks();
  }, []);

  return (
    <main className='seeTracks'>
      <h1> Available Racing Roadways </h1>
      <section className='tracksWrapper'>
        {tracksData.map(({ _id, trackName, location, miles }) => (
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
          </section>
        ))}
      </section>
    </main>
  );
}

export default AllTracks;
