// src/utils/jwtDecode.js
import jwt_decode from 'jwt-decode'; // Default import kullan

export const jwtDecode = (token) => {
  return jwt_decode(token);
};
