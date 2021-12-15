import './App.css';
import './styles/sb-admin-2.min.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Admin } from './pages/Admin/Admin';
import { Login } from './pages/Account';
import { PrivateRoute, AccountRoute } from './components';

function App() {
  return (
    <div className='App' id='wrapper'>
      <Router>
        <Routes>
          <Route path="/"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="/login"
            element={
              <AccountRoute>
                <Login />
              </AccountRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;