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
// Fonction pour authentifier un utilisateur
export const authenticate = async (request: AuthenticateRequest): Promise<AuthenticationResponse> => {
  const response = await axios.post<AuthenticationResponse>(`${API_URL}/authenticate`, request);
  return response.data;
};

// Fonction pour rafraîchir le token (si besoin)
export const refreshToken = async (): Promise<void> => {
  // Vous devrez peut-être envoyer des cookies ou des en-têtes spécifiques selon la configuration du backend
  await axios.post(`${API_URL}/refresh-token`, {}, { withCredentials: true });
};