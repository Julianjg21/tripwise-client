import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.mjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "./contexts/AuthContext.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Provide the AuthContext to the entire application */ }
      <AuthProvider>
          <App />
      </AuthProvider>
  </React.StrictMode>
);
