import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Interceptor to add the auth token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle expired tokens and refresh them
apiClient.interceptors.response.use(
  // If the response is successful, just return it
  (response) => {
    return response;
  },
  // If there's an error...
  async (error) => {
    const originalRequest = error.config;
    
    // Check if the error is 401 (Unauthorized) and it's not a retry request
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark it as a retry to prevent infinite loops

      try {
        // Use the refresh token to get a new access token
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: refreshToken,
        });

        // Update the tokens in local storage
        const newAccessToken = response.data.access;
        localStorage.setItem('authToken', newAccessToken);

        // Update the authorization header of the original request
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If the refresh token is also invalid, log the user out
        console.error("Refresh token is invalid, logging out.", refreshError);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // For other errors, just return the error
    return Promise.reject(error);
  }
);

export default apiClient;