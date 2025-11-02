// Configuration for API base URL based on environment
const environment = import.meta.env.VITE_ENVIRONMENT || 'development';

const getBaseURL = () => {
  if (environment === 'production') {
    return 'https://artifybackend.onrender.com';
  }
  // Default to development
  return 'http://localhost:8080';
};

export const API_BASE_URL = getBaseURL();

