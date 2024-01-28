import React, { useState } from 'react';
import searchIcon from '../assets/Search.svg';
import menuIcon from '../assets/Icon - Menu.svg';
import circleIcon from '../assets/Icon - circle down.svg';
import chickedIcon from '../assets/icon-checked.svg';
import unChickedIcon from '../assets/icon-unchecked.svg';
import disabledIcon from '../assets/disabledCheck.svg';
import arrowLeft from '../assets/Arrow - Right 2.svg';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { useDispatch } from 'react-redux';
import clockIcon from '../assets/Clock.svg';
import { changeStepNumber, setZidProduct } from '../features/user/userSlice';
export default function ZidBook() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const { isPending: isLoadingFetchData, data: products } = useQuery({
    queryKey: ['allBookingProducts', search],
    queryFn: async () => {
      const { data } = await customFetch(`/get-products?name=${search}`);
      return data.data;
    },
  });
  const [checkedProducts, setCheckedProducts] = useState([]);

  return (
    <>
      {/* search */}
      <div className='relative'>
        <div className='form-control '>
          <input
            type='text'
            placeholder='بحث'
            className='input input-bordered input-sm sm:input-md rounded-3xl'
            name='s'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='absolute top-2 sm:top-3 left-5'>
          <img src={searchIcon} alt='search' />
        </div>
      </div>
      {/* All services */}
      <div className='allServices flex flex-col gap-2 sm:gap-4 h-[75vh] overflow-y-auto'>
        {/* Ehgzly */}
        <div className='rounded-xl border-[1px] border-[#E1E2E2] bg-[#FBFBFE] py-2 px-3 sm:py-3 sm:px-4'>
          <h2 className='text-lg font-bold my-1 sm:my-3'>اختر خدمتك في زد</h2>
          <div className='services'>
            {isLoadingFetchData ? (
              <div className=' flex justify-center'>
                <span className='loading loading-infinity loading-lg text-primary'></span>
              </div>
            ) : products?.length === 0 ? (
              <h3 className='text-center text-lg font-semibold text-primary'>
                لا يوجد منتجات
              </h3>
            ) : (
              <div className='flex flex-col gap-3 sm:gap-6'>
                {products?.map((product) => (
                  <div
                    className=' bg-base-100 rounded-xl border-[1px] border-[#E1E2E2] '
                    key={product.id}
                  >
                    <div className=' flex justify-between flex-wrap gap-3 p-3'>
                      <div className='flex items-center gap-2'>
                        <img src={menuIcon} alt='menuIcon' />
                        <img src={circleIcon} alt='menuIcon' />
                        <span className='btn btn-sm bg-[#EFEFFB] border-[1px] border-[#6464DD] '>
                          {product?.name?.ar}
                        </span>
                      </div>
                      <button
                        // disabled={checkedProducts.length === 1}
                        onClick={() => {
                          setCheckedProducts([product.id]);
                          dispatch(setZidProduct(product));
                        }}
                      >
                        <img
                          src={
                            checkedProducts.includes(product.id)
                              ? chickedIcon
                              : unChickedIcon
                          }
                          alt='checkbox'
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* button */}
      <div className='absolute bottom-[20px] left-[50%] -translate-x-[50%]'>
        <button
          className=' btn btn-primary btn-sm  rounded-3xl btn-wide md:w-[615px]'
          onClick={() => dispatch(changeStepNumber(2))}
          disabled={checkedProducts.length === 0}
        >
          التالي
        </button>
      </div>
    </>
  );
}
