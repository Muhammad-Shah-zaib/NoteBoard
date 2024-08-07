export const API_ENDPOINT = 'http://localhost:5082/api';

// Notes Endpoint URLs
export const NOTES_ENDPOINT = `${API_ENDPOINT}/notes`;

// SavedWhiteboards Endpoint URLs
export const WHITEBOARD_ENDPOINT = `${API_ENDPOINT}/whiteboard`;

// Users Endpoint URLs
export const USERS_ENDPOINT = `${API_ENDPOINT}/User`;

export const VERIFY_EMAIL_ENDPOINT = `${USERS_ENDPOINT}/VerifyEmail/`;
export const SINGUP_ENDPOINT = `${USERS_ENDPOINT}/Register`;
export const LOGIN_ENDPOINT = `${USERS_ENDPOINT}/login`;
export const VERIFY_LOGIN_ENDPOINT = `${USERS_ENDPOINT}/VerifyLogin/`;
export const VERIFY_CREDENTIALS_ENDPOINT = `${USERS_ENDPOINT}/VerifyCredentials`;