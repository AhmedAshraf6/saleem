import React from 'react';
import img from '../assets/Messages 04.svg';
export default function UnLinkedServices() {
  return (
    <section className='my-6 sm:my-10 flex flex-col gap-1 sm:gap-2'>
      <div className='flex flex-col justify-center items-center gap-3 sm:gap-5'>
        <img src={img} alt='image' className='w-48 h-48' />
        <h4>لا يوجد بيانات</h4>
      </div>
    </section>
  );
}
