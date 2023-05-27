import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App'
import { BooksContextProvider } from './context/BooksContext'
import { AuthContextProvider } from './context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoansContextProvider } from './context/LoansContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BooksContextProvider>
        <LoansContextProvider>
          <App/>
        </LoansContextProvider>
      </BooksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
