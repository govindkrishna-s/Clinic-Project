import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await apiClient.get('/doctors/');
        setDoctors(response.data);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) return <p>Loading doctors...</p>;

  return (
    <div>
      <h2>Our Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            Dr. {doctor.name} - {doctor.speciality} ({doctor.department.name})
            <Link to={`/book-appointment/${doctor.id}`}>
              <button>Book Appointment</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorListPage;