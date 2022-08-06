import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/PlayerSlice';
import { Provider } from 'react-redux';

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
      <App />
    </Provider>
  </React.StrictMode>
);