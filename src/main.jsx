import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search.jsx';
import App from './App.jsx';  // Assuming you already have this component


// Render the component using React 18 API
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <div style={{position:'relative' , zIndex:1}}>
     
    <Search/>
   
    </div>
   
  </StrictMode>
);
