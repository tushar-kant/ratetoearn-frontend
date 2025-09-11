import axios from 'axios';
import API_BASE_URL from './apiConfig';
import API_PATHS from './apiPath';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async (url, data = {}, config = {}) => {
  try {
    const response = await api.get(url, { ...config, params: data });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const post = async (url, data, config = {}) => {
  try {
    const response = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const put = async (url, data, config = {}) => {
  try {
    const response = await api.put(url, data, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const del = async (url, config = {}) => {
  try {
    const response = await api.delete(url, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOfferDetails = async (id) => {
  try {
    const response = await post(API_PATHS.APP_OFFERS_ID, { id });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTaskDetails = async (id) => {
  try {
    const response = await post(API_PATHS.TASK_OFFERS_ID, { id });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReviewDetails = async (id) => {
  try {
    const response = await post(API_PATHS.REVIEW_OFFERS_ID, { id });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const completeReview = async (taskId, phone) => {
  try {
    const response = await post(API_PATHS.REVIEW_COMPLETE_APP_OFFER, { taskId, phone });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const completeTaskReview = async (taskId, phone) => {
  try {
    const response = await post(API_PATHS.REVIEW_COMPLETE_TASK_OFFER, { taskId, phone });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const completeReviewReview = async (taskId, phone) => {
  try {
    const response = await post(API_PATHS.REVIEW_COMPLETE_REVIEW_OFFER, { taskId, phone });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default api;
