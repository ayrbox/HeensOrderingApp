import axios from 'axios';

export const getOrders = async () => {
  try {
    return await axios.get('/api/orders');
  } catch (err) {
    throw err;
  }
};

export const getOrder = async (id) => {
  try {
    return await axios.get(`/api/orders/${id}`);
  } catch (err) {
    throw err;
  }
};

export const createOrder = async (order) => {
  try {
    return await axios.post('/api/orders', order);
  } catch (err) {
    throw err;
  }
};

export const updateOrder = async (id, status) => {
  try {
    return await axios.put(`/api/orders/${id}`, status);
  } catch (err) {
    throw err;
  }
};
