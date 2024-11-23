import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Chủ đề PrimeReact
// import 'primereact/resources/primereact.min.css';                   // CSS của PrimeReact
// import 'primeicons/primeicons.css';                                 // Các icon của PrimeReact
// import 'primeflex/primeflex.css';                                   // PrimeFlex cho layout


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
