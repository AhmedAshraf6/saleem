import React, { useState } from 'react';
import addIcon from '../assets/icon - addsquare.svg';
import linkIcon from '../assets/link.png';
import LinkedServices from './LinkedServices';
import UnLinkedServices from './UnLinkedServices';
import BookingModal from './BookingModal';
export default function ServicesSection() {
  const [active, setActive] = useState('linked');
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  return (
    <section className='bg-base-100 mb-3 sm:mb-5 py-3 sm:py-5 px-5 sm:px-16 rounded-xl'>
      <div className='flex justify-between items-center flex-wrap gap-3 '>
        <div className='flex gap-2 sm:gap-3'>
          <button
            className={`text-sm sm:text-base font-bold flex gap-2 items-center ${
              active === 'linked'
                ? 'text-primary border-b-2 border-primary'
                : 'text-[#9A9A9A]'
            }`}
            onClick={() => setActive('linked')}
          >
            <img src={linkIcon} alt='linkIcon' />
            <span> الخدمات المربوطة</span>
          </button>
          <button
            className={`text-sm sm:text-base font-bold flex gap-2 items-center ${
              active === 'unLinked'
                ? 'text-primary border-b-2 border-primary'
                : 'text-[#9A9A9A]'
            }`}
            onClick={() => setActive('unLinked')}
          >
            {/* <img src={linkIcon} alt='linkIcon' /> */}

            <span> الخدمات غير المربوطة</span>
          </button>
        </div>
        <button className='btn btn-primary btn-sm px-6 ' onClick={handleToggle}>
          <img src={addIcon} alt='addIcon' />
          اضافة خدمة
        </button>
      </div>
      {active === 'linked' ? <LinkedServices /> : <UnLinkedServices />}
      {open && <BookingModal open={open} handleToggle={handleToggle} />}
    </section>
  );
}
