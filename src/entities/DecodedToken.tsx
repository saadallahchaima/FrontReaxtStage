import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  firstName: string;
  lastName: string;
  email: string;
}

const token = localStorage.getItem('token'); // Si tu stockes le token dans localStorage
if (token) {
  const decodedToken = jwtDecode<DecodedToken>(token);
  const { firstName, lastName, email } = decodedToken;
  console.log(firstName, lastName, email);
}
