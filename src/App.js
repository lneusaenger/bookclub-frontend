import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import HomePage from './pages/home'
import Shelves from './pages/shelves';
import People from './pages/people';
import Login from './pages/login';
import Signup from './pages/signup';
import Loaning from './pages/loaning';
import Account from './pages/account';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<HomePage />}
            />
            <Route 
              path="/shelves" 
              element={<Shelves />} 
            />
            <Route 
              path="/loaning" 
              element={<Loaning />} 
            />
            <Route 
              path="/people" 
              element={<People />} 
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/signup" 
              element={<Signup />} 
            />
            <Route 
              path="/account" 
              element={<Account />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;