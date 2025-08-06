import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DoctorListPage from './pages/DoctorListPage';
import AppointmentListPage from './pages/AppointmentListPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import apiClient from './services/api';
import './App.css'; 
import SignupPage from './pages/SignUpPage';

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
        <nav className="w-full bg-gray-900/50 shadow-lg">
          <div className="container mx-auto px-4 flex justify-between items-center py-3">
            <h1 className="text-xl font-bold">
              <Link to="/">Clinic App</Link>
            </h1>
            <div className="flex items-center space-x-4">
              {token && <Link to="/doctors">Doctors</Link>}
              {token && <Link to="/appointments">My Appointments</Link>}
              {token && (
                <button onClick={handleLogout} className="btn-secondary">
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>

        <main className="flex-grow flex items-center justify-center">
          <div className="container px-4 py-8">
            <Routes>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/doctors" element={token ? <DoctorListPage /> : <Navigate to="/login" />} />
              <Route path="/appointments" element={token ? <AppointmentListPage /> : <Navigate to="/login" />} />
              <Route path="/book-appointment/:doctorId" element={token ? <BookAppointmentPage /> : <Navigate to="/login" />} />
              <Route path="/" element={<Navigate to={token ? "/doctors" : "/login"} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;