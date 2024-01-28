import React from 'react';
import filterIcon from '../../assets/Icon - filtersquare.svg';
import printerIcon from '../../assets/printer.svg';
import { Table } from '../../components';
export default function Profile() {
  return (
    <section className='table rounded-xl bg-base-100 mt-3 sm:mt-5 p-4 sm:p-6 '>
      <div className='flex justify-between flex-wrap gap-3 items-center'>
        <h1 className='text-2xl font-bold text-[#000]'>الحجوزات السابقة</h1>
        <div className='flex gap-2'>
          <button className='btn btn-sm  border-[#6464DE]  bg-base-100 text-primary'>
            <img src={printerIcon} alt='printerIcon' />
            طباعة
          </button>
          <button className='btn  btn-sm border-[#6464DE] bg-base-100  text-primary'>
            <img src={filterIcon} alt='printerIcon' />
            فلتر
          </button>
        </div>
        {/* table */}
      </div>
      <Table />
    </section>
  );
}
