import './App.css';

import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Admin from './pages/Admin';
import AllTracks from './pages/AllTracks';
import Track from './pages/Track';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/dashboard' element={<Admin />} />
        <Route path='/alltracks' element={<AllTracks />} />
        <Route path='/racer/:trackId' element={<Track />} />
      </Routes>
    </div>
  );
}

export default App;
