import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

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

  const departments = useMemo(() => {
    const allDepts = doctors.map(doc => doc.department);
    return ['All Departments', ...new Set(allDepts)];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesDepartment = selectedDepartment === 'All Departments' || !selectedDepartment || doctor.department === selectedDepartment;
      
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            doctor.department.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDepartment && matchesSearch;
    });
  }, [doctors, searchQuery, selectedDepartment]);


  if (loading) {
    return <p className="text-center text-gray-400">Loading doctors...</p>;
  }

  return (
    <div className="w-full max-w-6xl">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Our Specialists
      </h2>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input 
          type="text"
          placeholder="Search by name, specialty, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow px-4 py-2 text-white bg-zinc-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-2 text-gray-300 bg-zinc-900 border-3 border-r-4 border-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 cursor-pointer"
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <Link key={doctor.id} to={`/book-appointment/${doctor.id}`} className="block">
              <div className="bg-zinc-900 rounded-xl shadow-lg p-6 h-full flex flex-col justify-between hover:bg-gray-700/50 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div>
                  <h3 className="text-xl font-bold text-white">Dr. {doctor.name}</h3>
                  <p className="text-blue-300 mt-1">{doctor.speciality}</p>
                  <p className="text-gray-400 text-sm mt-2">{doctor.department}</p>
                </div>
                <div className="text-center mt-4 text-lg font-semibold text-green-500">
                  Book Now
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-400 md:col-span-2 lg:col-span-3">No doctors found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorListPage;