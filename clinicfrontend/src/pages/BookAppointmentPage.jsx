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
      setSuccess('Appointment booked successfully!');
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
    <div>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div><label>Patient Name:</label><input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required /></div>
        <div><label>Age:</label><input type="number" value={age} onChange={(e) => setAge(e.target.value)} required /></div>
        <div><label>Appointment Date:</label><input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required /></div>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookAppointmentPage;