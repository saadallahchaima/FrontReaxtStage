import { jwtDecode } from "jwt-decode";

const getUserInfo = (token: string) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken; // Cela retournera les informations décodées du token
  } catch (error) {
    console.error('Error decoding token', error);
    return null;
  }
};
