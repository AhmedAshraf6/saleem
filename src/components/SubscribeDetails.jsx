import React from 'react';

export default function SubscribeDetails() {
  return (
    <div className='navbar bg-base-100 mb-3 sm:mb-5 py-3 sm:py-5 px-5 sm:px-16 rounded-xl'>
      {/* flex justify-between flex-wrap sm:flex-nowrap items-center */}
      <div className='flex items-start  flex-col gap-3'>
        <h3 className='text-xl sm:text-2xl font-bold'>لوحة التحكم</h3>
        <h3 className='text-primary text-xs sm:text-sm  font-light'>
          تفاصيل الاشتراك
        </h3>
      </div>
    </div>
  );
}
