import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/PlayerSlice';
import { Provider } from 'react-redux';
import App2 from './App2';

const store = configureStore(
  {
    reducer: {
      player: playerReducer,
    }
  }
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      {/* <App /> */}
      <App2 />
    </Provider>
  </React.StrictMode>
);