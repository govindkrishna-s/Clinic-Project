import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await apiClient.post('/users/login', { email, password });
      
      localStorage.setItem('authToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      window.location.href = '/doctors';
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-zinc-900 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white">
        Welcome Back!
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
          />
        </div>

        {error && <p className="text-sm text-center text-red-500">{error}</p>}
        
        <button type="submit" className="w-full btn-primary">
          Login
        </button>
      </form>
      
      <p className="text-sm text-center text-gray-400">
        Don't have an account? 
        <Link to="/signup" className="ml-1 font-medium text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;