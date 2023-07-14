import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div>
      <header className=''>
        {' '}
        <h1> Racing Roadways</h1>{' '}
      </header>

      <main className='main'>
        <h3>
          {' '}
          Welcome to Racing Roadways! <br /> <br />
          Here you can see all races and the best times for those races.
          <br /> <br />
          Weather they are just down highway 77 or if they are a lap around
          downtown. We have what you need.
        </h3>

        <Link className='Btn' to='/alltracks'>
          See Tracks
        </Link>
      </main>
    </div>
  );
}

export default Homepage;
