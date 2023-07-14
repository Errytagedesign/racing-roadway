import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <section className='navbar'>
      <div>
        <h4> Racing Roadways</h4>
      </div>
      <ul>
        <li>
          {' '}
          <Link to='/'> Home </Link>{' '}
        </li>
        <li>
          {' '}
          <Link to='/alltracks'> Tracks </Link>{' '}
        </li>
      </ul>
    </section>
  );
}

export default Navbar;
