import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getPortfolioByUsername = (username) => api.get(`/portfolio/${username}`);
export const getMyPortfolio = () => api.get('/portfolio/me');
export const createUpdatePortfolio = (data) => api.post('/portfolio', data);
export const checkUsernameAvailability = (username) => api.get(`/portfolio/check-username/${username}`);
export const updateUsername = (username) => api.put('/portfolio/username', { username });

export const getPublicCaseStudies = (username) => api.get(`/case-study/portfolio/${username}`);
export const getMyCaseStudies = () => api.get('/case-study/me');
export const getCaseStudy = (id) => api.get(`/case-study/${id}`);
export const createCaseStudy = (data) => api.post('/case-study', data);
export const updateCaseStudy = (id, data) => api.put(`/case-study/${id}`, data);
export const deleteCaseStudy = (id) => api.delete(`/case-study/${id}`);
export const reorderCaseStudies = (order) => api.put('/case-study/reorder', { order });

export const getSystemThemes = () => api.get('/theme/system');
export const getThemeById = (id) => api.get(`/theme/${id}`);
export const createCustomTheme = (data) => api.post('/theme/custom', data);

export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);

export const trackView = (data) => api.post('/analytics/track-view', data);
export const trackClick = (data) => api.post('/analytics/track-click', data);
export const getPortfolioAnalytics = () => api.get('/analytics/portfolio');