import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import ConfirmationModal from '../components/ConfirmationModal';

const AppointmentListPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiClient.get('/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {

        setLoading(false);
      }
    };
    
    fetchAppointments();
  }, []);

  const handleOpenDeleteModal = (id) => {
    setAppointmentToDelete(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setAppointmentToDelete(null);
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!appointmentToDelete) return;

    try {

      await apiClient.delete(`/appointments/${appointmentToDelete}/delete/`);

      setAppointments(appointments.filter(apt => apt.id !== appointmentToDelete));
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    } finally {

      handleCloseModal();
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400">Loading your appointments...</p>;
  }

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-3xl font-bold text-center text-white mb-8">My Booked Appointments</h2>
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <p className="text-center text-gray-400 bg-zinc-900 p-6 rounded-xl">You have no appointments scheduled.</p>
        ) : (
          appointments.map((apt) => (
            <div key={apt.id} className="bg-zinc-900 p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="text-lg font-bold text-white">{apt.patient_name}</p>
                <p className="text-sm text-gray-400"><span className="font-semibold text-blue-300">Dr. {apt.doctor.name}</span> ({apt.doctor.speciality})</p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="font-semibold text-gray-300">{apt.appointment_date}</p>
                <button 
                  onClick={() => handleOpenDeleteModal(apt.id)}
                  className="bg-red-600/50 hover:bg-red-600 text-white text-xs font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this appointment? This action cannot be undone."
      />
    </div>
  );
};

export default AppointmentListPage;