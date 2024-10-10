import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import  store from './app/store.jsx';
import App from './App';
import { AuthProvider } from './service/AuthContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </AuthProvider>
  </React.StrictMode>
);