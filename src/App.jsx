import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {
  Login,
  Error,
  ProtectedRoute,
  ForgetPassword,
  ResetPassword,
} from './pages';
import { Home, Profile, SharedLayout } from './pages/dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path='profile' element={<Profile />} />
        </Route>

        <Route path='login' element={<Login />} />
        <Route path='forget-password' element={<ForgetPassword />} />
        <Route path='reset-password' element={<ResetPassword />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer
        position='top-center'
        hideProgressBar={true}
        autoClose={4000}
        rtl={true}
      />
    </BrowserRouter>
  );
}
