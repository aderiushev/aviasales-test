import http from '../utils/http';

export const fetch = () => http.get(`/dashboard`);
