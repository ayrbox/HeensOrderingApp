import axios from 'axios';

export const getCategory = async (id) => {
  try {
    return await axios.get(`/api/categories/${id}`);
  } catch (err) {
    throw err;
  }
};

export const createCategory = async (category) => {
  try {
    return await axios.post('/api/categories', category);
  } catch (err) {
    throw err;
  }
};

export const updateCategory = async (id, category) => {
  try {
    return await axios.put(`/api/categories/${id}`, category);
  } catch (err) {
    throw err;
  }
};

export const deleteCategory = async (id) => {
  try {
    return await axios.delete(`/api/categories/${id}`);
  } catch (err) {
    throw err;
  }
};
