import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

const AppointmentListPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiClient.get('/appointments/');
        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) return <p>Loading your appointments...</p>;

  return (
    <div>
      <h2>My Booked Appointments</h2>
      {appointments.length === 0 ? (
        <p>You have no appointments.</p>
      ) : (
        <ul>
          {appointments.map((apt) => (
            <li key={apt.id}>
              Appointment on <strong>{apt.appointment_date}</strong> with{' '}
              <strong>Dr. {apt.doctor.name}</strong> ({apt.doctor.speciality})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentListPage;