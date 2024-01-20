import React, { useState, useEffect } from 'react';
import {isNameValid, getLocations} from '../../mock-api/apis.js';
import './AddUserPage.css';

function AddUserPage(props) {
  const { onAddLocations} =  props;
  // State variables for name, location, and error messages
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [dropDownlocations, setDropDownlocations] = useState([]);
  const [nameError, setNameError] = useState('');
  const [apiError, setApiError] = useState(null);
  const [isValid, setIsValid] = useState(true);

  // Function to handle name validation
  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    // Call the mock API to check name availability
    isNameValid(newName)
      .then((isValid) => {
        if (isValid) {     
            setNameError('');       
        } else {
            setNameError('this name has already been taken');
        }
      })
  };

  // Function to clear name and location values
  const handleClear = () => {
    setName('');
    setLocation('')
    setNameError('');
    setIsValid(true);
  }

  // Function to fetch location options from the mock API
  useEffect(() => {
    // Call the mock API to fetch location options
    // Set location options in state
    getLocations()
      .then((fetchedLocations) => {
        setDropDownlocations(fetchedLocations);
      })
      .catch((error) => {
        setApiError(error);
      });
  }, []);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    if ( nameError || apiError || !name || !location) {
        setIsValid(false);
        return;
    }
    setIsValid(true);
    onAddLocations({name: name, location:location});
    setName('');
    setLocation('')
    setNameError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name input with error message */}
      <div className='row align-items-center'>
        <label className='col-xs-4 col-sm-3 col-lg-2 text-end'>Name</label>
        <div className='col-xs-8 col-sm-9 col-lg-10'>
            <input className='w-100 p-2' type="text" value={name} onChange={handleNameChange}/>
            {nameError && <p className="error">{nameError}</p>}
        </div>
      </div>

      {/* Location dropdown */}
      <div className='row mt-4 align-items-center'>
        <label className='col-xs-4 col-sm-3 col-lg-2 text-end'>Location</label>
        <div className='col-xs-8 col-sm-9 col-lg-10'>
            {apiError ? (<p>Error fetching locations: {apiError.message}</p>) : (
            <select className='w-100 p-2' value={location} onChange={(event) => setLocation(event.target.value)}>
                {/* Populate options from fetched location data */}
                <option key={0}>Please select a location</option>
                {dropDownlocations.map((location) => (
                    <option key={location}>{location}</option>
                ))}
                </select>
            )}
        </div>
      </div>
      <div className='mt-5'>
        <div className="row mx-1">
            {
                !isValid &&
                <div class="col-md-6 offset-md-6 alert alert-danger mt-4 p-2 text-center" role="alert">
                    There are at least error or you didn't input one of Name and Location.
                </div>
            }
            <div className="col-md-6 offset-md-6 mt-2 p-0">
                <div className="d-flex justify-content-end">
                    <button className="mt-1 me-5" style={{width:'100px'}} type="button" onClick={handleClear}>Clear</button>
                    <button className="mt-1" style={{width:'100px'}} type="submit">Add</button>
                </div>
            </div>
        </div>
      </div>
    </form>
  );
}

export default AddUserPage;