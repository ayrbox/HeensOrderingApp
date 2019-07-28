import axios from 'axios';

export const getCustomers = async () => {
  try {
    return await axios.get('/api/customers');
  } catch (err) {
    throw err;
  }
};


export const getCustomer = async (id) => {
  try {
    return await axios.get(`/api/customers/${id}`);
  } catch (err) {
    throw err;
  }
};

export const createCustomer = async (customer) => {
  try {
    return await axios.post('/api/customers/', customer);
  } catch (err) {
    throw err;
  }
};

export const updateCustomer = async (id, customer) => {
  try {
    return await axios.put(`/api/customers/${id}`, customer);
  } catch (err) {
    throw err;
  }
};

export const deleteCustomer = async (id) => {
  try {
    return await axios.delete(`/api/customers/${id}`);
  } catch (err) {
    throw err;
  }
};
