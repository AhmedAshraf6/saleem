import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../../components';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

const SharedLayout = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <main className='min-h-screen py-5 sm:py-10 align-element flex flex-col '>
      {/* <div className=' h-full bg-red-100'> */}
      <div className='flex-1'>
        <Navbar />
        <Outlet />
      </div>
      <div className='mt-auto'>
        <Footer />
      </div>
      {/* </div> */}
    </main>
  );
};

export default SharedLayout;
