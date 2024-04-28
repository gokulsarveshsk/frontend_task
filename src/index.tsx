// index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import contactReducer from './Redux/contactActions';

// Load initial state from local storage
const storedContacts = localStorage.getItem('contacts');
const initialState = storedContacts ? JSON.parse(storedContacts) : [];

// Create Redux store
const store = createStore(contactReducer, initialState);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Subscribe to the store
store.subscribe(() => {
  console.log('Current State:', store.getState());
});

root.render(
  <Router> 
    <React.StrictMode>
      <Provider store={store}>
        <App />
    </Provider>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
