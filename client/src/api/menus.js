import axios from 'axios';

export const getMenus = async () => {
  try {
    return await axios.get('/api/menus');
  } catch (err) {
    throw err;
  }
};

export const getMenu = async (id) => {
  try {
    return await axios.get(`/api/menus/${id}`);
  } catch (err) {
    throw err;
  }
};

export const createMenu = async (menu) => {
  try {
    return await axios.post('/api/menus/', menu);
  } catch (err) {
    throw err;
  }
};

export const updateMenu = async (id, menu) => {
  try {
    return await axios.put(`/api/menus/${id}`, menu);
  } catch (err) {
    throw err;
  }
};

export const deleteMenu = async (id) => {
  try {
    return await axios.delete(`/api/menus/${id}`);
  } catch (err) {
    throw err;
  }
};

export const addOption = async (id, option) => {
  try {
    return await axios.post(`/api/menus/${id}/options`, option);
  } catch (err) {
    throw err;
  }
};

export const deleteOption = async (id, optionId) => {
  try {
    return await axios.delete(`/api/menus/${id}/options/${optionId}`);
  } catch (err) {
    throw err;
  }
};
