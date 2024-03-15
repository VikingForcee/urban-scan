import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';

function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.URBAN_SCAN_API_KEY
  })

  return (
    <Router>
      <Header></Header>
    <Fragment>
      <div classname="flex flex-col min-h-screen">
        <h1 className='text-center'>Urban Scan</h1>
        <div style={{ width:"100%",height:"90vh"}}>
          
        </div>
      </div>
    </Fragment>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
      <Footer></Footer>

    </Router>
  )
}1

export default App
