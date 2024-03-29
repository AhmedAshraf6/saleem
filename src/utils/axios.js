import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';
import { useDispatch } from 'react-redux';
import { clearStore } from '../features/user/userSlice';
import { toast } from 'react-toastify';
const customFetch = axios.create({
  baseURL: 'https://dashboard.saleemdev.appsbunches.com/api',
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});
export const checkForUnauthorizedResponse = (error, dispatch) => {
  if (error?.response?.status === 401) {
    dispatch(clearStore());
  }
  return toast.error(error?.response?.data?.message || error?.message);
};
export default customFetch;
