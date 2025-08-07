import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../services/api';

const SignUpPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const payload = {
            user: {
                email: email,
                password: password
            }
        };
        await apiClient.post('/users/signup', payload);
        navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMessages = Object.values(err.response.data).flat().join(' ');
        setError(errorMessages);
      } else {
        setError('Failed to create account. Please try again.');
      }
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-zinc-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-white">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                 className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                 className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" className="w-full btn-primary">Sign Up</button>
      </form>
      <p className="text-sm text-center text-gray-400">
        Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Log In</Link>
      </p>
    </div>
  );
};

export default SignUpPage;