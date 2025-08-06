import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

const BookAppointmentPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess('');

    const appointmentData = {
      patient_name: patientName,
      age: parseInt(age, 10),
      appointment_date: appointmentDate,
      doctor_id: parseInt(doctorId, 10),
    };

    try {
      await apiClient.post('/appointments/create/', appointmentData);
      setSuccess('Appointment booked successfully! Redirecting...');
      setTimeout(() => navigate('/appointments'), 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMessages = Object.values(err.response.data).flat().join(' ');
        setError(errorMessages);
      } else {
        setError('Failed to book appointment. Please try again.');
      }
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-lg p-8 space-y-6 bg-zinc-900 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300">Patient Name</label>
          <input 
            type="text" 
            value={patientName} 
            onChange={(e) => setPatientName(e.target.value)} 
            required 
            className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Age</label>
          <input 
            type="number" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            required
            className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Preferred Appointment Date</label>
          <input 
            type="date" 
            value={appointmentDate} 
            onChange={(e) => setAppointmentDate(e.target.value)} 
            required
            className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {error && <p className="text-sm text-center text-red-500">{error}</p>}
        {success && <p className="text-sm text-center text-green-500">{success}</p>}
        
        <button type="submit" className="w-full btn-primary">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookAppointmentPage;