import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';

const initialState = {
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
  stepNumber: 1,
  zidProduct: {},
  ihgznyProduct: {},
};

export const clearStore = createAsyncThunk(
  'user/clearStore',
  async (message, thunkAPI) => {
    try {
      // logout user
      thunkAPI.dispatch(logoutUser(message));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.user = payload;
      addUserToLocalStorage(payload);
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    changeStepNumber: (state, { payload }) => {
      state.stepNumber = payload;
    },
    setZidProduct: (state, { payload }) => {
      state.zidProduct = payload;
    },
    setIhgznyProduct: (state, { payload }) => {
      state.ihgznyProduct = payload;
    },
    clearServices: (state) => {
      state.zidProduct = {};
      state.ihgznyProduct = {};
      state.stepNumber = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearStore.rejected, () => {
      toast.error('there is an error');
    });
  },
});
export const {
  toggleSidebar,
  logoutUser,
  loginUser,
  changeStepNumber,
  setZidProduct,
  setIhgznyProduct,
  clearServices,
} = userSlice.actions;

export default userSlice.reducer;
