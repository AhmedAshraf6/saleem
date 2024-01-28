import React, { useState } from 'react';

import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import ZidBook from './ZidBook';
import IhgznyBook from './IhgznyBook';
import PreviewAndFinish from './PreviewAndFinish';
import canselIcon from '../assets/Cancel  24  Outline.svg';
import { changeStepNumber } from '../features/user/userSlice';

const BookingModal = ({ open, handleToggle }) => {
  const dispatch = useDispatch();
  const modalClass = cn({
    'modal modal-middle ': true,
    'modal-open': open,
  });
  const { stepNumber } = useSelector((store) => store.user);

  return (
    <dialog id='product_modal' className={`${modalClass}`}>
      <div className='modal-box max-w-[82rem] h-[82rem] p-0 overflow-hidden'>
        <form
          method='dialog'
          className='flex justify-between items-center bg-[#F5F7F7] py-2 px-5'
        >
          <h3 className='text-base sm:text-lg font-semibold '>
            اضافة منتج في واجة السلة
          </h3>
          <button
            onClick={() => {
              handleToggle();
              dispatch(changeStepNumber(1));
            }}
          >
            {/* <IoMdClose className='font-bold text-black text-lg' /> */}
            <img src={canselIcon} alt='canselIcon' />
          </button>
        </form>
        <div className='flex flex-col gap-3 mt-3 sm:mt-5 px-5 sm:px-6'>
          <ul className='steps'>
            <li className={`step ${stepNumber >= 1 && 'step-primary'}`}>
              اختر خدمتك من زد
            </li>
            <li className={`step ${stepNumber >= 2 && 'step-primary'}`}>
              اختر خدمتك من احجزني
            </li>
            <li className={`step ${stepNumber >= 3 && 'step-primary'}`}>
              مراجعة وإنهاء
            </li>
          </ul>
          {stepNumber === 1 ? (
            <ZidBook />
          ) : stepNumber === 2 ? (
            <IhgznyBook />
          ) : (
            stepNumber === 3 && <PreviewAndFinish handleToggle={handleToggle} />
          )}
        </div>
      </div>
    </dialog>
  );
};

export default BookingModal;

// className={`${isSidebarOpen ? 'block lg:hidden' : 'hidden '}`}
