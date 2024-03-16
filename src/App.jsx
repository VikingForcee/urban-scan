import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';

const markers = [
  {
    id: 1,
    name: "Qobustan",
    position: { lat: 40.0709493, lng: 49.3694411 },
  },
  {
    id: 2,
    name: "Sumqayit",
    position: { lat: 40.5788843, lng: 49.5485073 },
  },
  {
    id: 3,
    name: "Baku",
    position: { lat: 40.3947365, lng: 49.6898045 },
  }
];

function App() {
  const [userPosition, setUserPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.3947365, lng: 49.6898045 }); // Default center
  const [showDialog, setShowDialog] = useState(false);
  const [clickedPosition, setClickedPosition] = useState(null); // Track clicked position
  const [landmarkType, setLandmarkType] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.URBAN_SCAN_API_KEY,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []); // Empty dependency array ensures this effect runs only once

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (position) => {
    setClickedPosition(position); // Set clicked position
    setShowDialog(true); // Show dialog when a marker is clicked
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleLandmarkTypeChange = (e) => {
    setLandmarkType(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    // Handle photo upload
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Submitted:", {
      position: clickedPosition,
      landmarkType,
      description,
      photo
    });
    setShowDialog(false); // Close dialog after submission
  };

  return (
    <Router>
      <Header />
      <Fragment>
        <div className="flex flex-col min-h-screen relative">
          <h1 className='text-center'>Urban Scan</h1>
          <div style={{ width: "100%", height: "90vh" }}>
            {isLoaded && userPosition ? (
              <GoogleMap
                center={mapCenter}
                zoom={10}
                onClick={(e) => {
                  const clickedPosition = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                  };
                  handleActiveMarker(clickedPosition);
                }}
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {markers.map(({ id, name, position }) => (
                  <MarkerF
                    key={id}
                    position={position}
                    onClick={() => handleActiveMarker(position)}
                    icon={{
                      url: "./assets/Pothole.png",
                      scaledSize: { width: 50, height: 50 }
                    }}
                  >
                    {activeMarker === id && (
                      <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                        <div>
                          <p>{name}</p>
                        </div>
                      </InfoWindowF>
                    )}
                  </MarkerF>
                ))}
              </GoogleMap>
            ) : null}
            {showDialog && clickedPosition && (
              <div className="absolute top-0 right-0 bg-white p-4 shadow-md">
                <h2 className="text-lg font-bold mb-2">Add Landmark</h2>
                <p>Latitude: {clickedPosition.lat}</p>
                <p>Longitude: {clickedPosition.lng}</p>
                <div className="mb-2">
                  <label htmlFor="landmarkType" className="block mb-1">Type of Landmark:</label>
                  <select id="landmarkType" className="border rounded p-1 w-full" onChange={handleLandmarkTypeChange}>
                    <option value="">Select Type</option>
                    <option value="pothole">Pothole</option>
                    <option value="broken_traffic_lights">Broken Traffic Lights</option>
                    <option value="garbage">Garbage</option>
                  </select>
                </div>
                <div className="flex flex-col max-w-xs">
                  <label htmlFor={description} className="text-sm font-semibold text-indigo-700 mb-1">Description:</label>
                  <input
                    type="text"
                    placeholder="Enter text here..."
                    className="px-4 py-2 border border-indigo-700 rounded-md focus:outline-none focus:border-indigo-500"
                    onChange={handleDescriptionChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="photo" className="block mb-1">Upload Photo:</label>
                  <input type="file" id="photo" className="border rounded p-1 w-full" onChange={handlePhotoChange} />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2" onClick={handleSubmit}>Submit</button>
                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400" onClick={handleCloseDialog}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
