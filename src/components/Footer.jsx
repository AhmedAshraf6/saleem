import React from 'react';
import phone from '../assets/Phone.svg';
import mail from '../assets/Message-5.svg';
import address from '../assets/map-marker.svg';
import logoCompany from '../assets/logoCompany.svg';
export default function Footer() {
  return (
    <div
      className={` flex justify-between gap-4 flex-wrap align-element  my-3 sm:my-5  `}
    >
      <div className='flex items-center flex-wrap gap-2'>
        <span className='text-xs text-[#666]'>
          جميع الحقوق محفوظة لـ تاسك اب - 2024
        </span>
        <a href='https://appsbunches.com/' target='_blank'>
          <img src={logoCompany} alt='logoCompany' />
        </a>
      </div>
      <div className='flex gap-3 flex-wrap'>
        <div className='flex gap-2 items-center'>
          <img src={address} alt='address' />
          <span className='text-xs text-[#666]'>
            طريق الامام سعود بن عبد العزيز (مخرج 9), الرياض{' '}
          </span>
        </div>
        <div className='flex gap-2 items-center'>
          <img src={mail} alt='mail' />
          <span className='text-xs text-[#666]'>
            <a href='mailto:Apps@AppsBunches.com'>Apps@AppsBunches.com </a>
          </span>
        </div>
        <div className='flex gap-2 items-center'>
          <img src={phone} alt='phone' />
          <span className='text-xs text-[#666]'>
            <a href='tel:+966532331339'>+966 532 331 339</a>
          </span>
        </div>
      </div>
    </div>
  );
}
