import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Stack overflow for server-side click locations
// https://stackoverflow.com/questions/34867066/javascript-mouse-click-coordinates-for-image
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
