import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import DoctorListPage from './pages/DoctorListPage';
import AppointmentListPage from './pages/AppointmentListPage';
import BookAppointmentPage from './pages/BookAppointmentPage';

import apiClient from './services/api';
import './App.css';

function App() {
  const token = localStorage.getItem('authToken');

  const handleLogout = async () => {
    try {
      await apiClient.post('/logout/');
    } catch (err) {
      console.error('Logout API call failed:', err);
    } finally {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#242424] text-white">
        
        <Navbar token={token} handleLogout={handleLogout} />

        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8 flex justify-center">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              <Route 
                path="/doctors" 
                element={token ? <DoctorListPage /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/appointments" 
                element={token ? <AppointmentListPage /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/book-appointment/:doctorId" 
                element={token ? <BookAppointmentPage /> : <Navigate to="/login" />} 
              />
              
              <Route 
                path="/" 
                element={<Navigate to={token ? "/doctors" : "/login"} />} 
              />
            </Routes>
          </div>
        </main>

      </div>
    </Router>
  );
}

export default App;