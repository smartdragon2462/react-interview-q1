import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import AddUserPage from './views/AddUserPage/AddUserPage.js';
import NameLocationTable from './components/NameLocationTable/NameLocationTable.js'
import './App.css';

function App() {
  const [locations, setLocations] = useState([]);

  const onAddLocations = (data) => {
    let mLocations = [...locations, data];
    setLocations(mLocations);
  }

  return (
    <div className="m-auto app-wrapper">
      <div className='mt-5'>
        <AddUserPage onAddLocations={onAddLocations}/>
      </div>
      <div className='mt-5'>
        <NameLocationTable locations={locations}/>
      </div>
    </div>
  );
}

export default App;
