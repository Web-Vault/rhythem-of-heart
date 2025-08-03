import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Get all posts
export const getAllPosts = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch posts' };
  }
};

// Get post by ID
export const getPostById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch post' };
  }
};

// Get posts by author
export const getPostsByAuthor = async (authorId) => {
  try {
    const response = await api.get(`/author/${authorId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch author posts' };
  }
};

const postService = {
  getAllPosts,
  getPostById,
  getPostsByAuthor
};

export default postService;