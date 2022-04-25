import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import RouteSwitch from './RouteSwitch'

// Stack overflow for server-side click locations
// https://stackoverflow.com/questions/34867066/javascript-mouse-click-coordinates-for-image
ReactDOM.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>,
  document.getElementById('root')
);


// import React from "react";
// import ReactDOM from "react-dom";
// import RouteSwitch from "./RouteSwitch";

// ReactDOM.render(
//   <React.StrictMode>
//     <RouteSwitch />
//   </React.StrictMode>,
//   document.getElementById("root")
// );