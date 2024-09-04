import axios from "axios";
import { AuthenticationResponse } from "../entities/AuthenticationResponse";
import { RegisterRequest } from "../entities/RegisterRequest";

const API_URL = 'http://localhost:8080/api/v1/auth'; 

export const registerUser = async (request: RegisterRequest): Promise<AuthenticationResponse> => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    throw new Error('An error occurred while registering');
  }
};


export const getStoredTokens = () => ({
  accessToken: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
});



export const refreshTokens = async () => {
  try {
    const response = await axios.post(`${API_URL}/refresh-token`, {}, { withCredentials: true });
    localStorage.setItem('access_token', response.data.accessToken);
    localStorage.setItem('refresh_token', response.data.refreshToken);
  } catch {
    // Handle token refresh failure (e.g., redirect to login page)
  }
};

export const logout = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.warn('No access token found in local storage.');
      return;
    }

    const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.ok) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
    } else {
      console.error('Logout failed with status:', response.status);
      // Optionally, handle different status codes or display an error message to the user
    }
  } catch (error) {
    console.error('Error during logout:', error);
    // Optionally, handle the error (e.g., show a notification to the user)
  }
};
