import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // 'null' while checking

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // We must include credentials to send the cookie to the server
        const res = await fetch('http://localhost:3000/api/check-auth',{ 
            credentials: 'include' 
        });
        
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    verifyUser();
  }, []);

  // Prevent flicker while checking auth
  if (isAuthenticated === null) return <div className="loading">Verifying Session...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} />
        
        <Route path="/dashboard" element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
        } />

        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;