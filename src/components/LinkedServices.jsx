import React from 'react';
import calendarIcon from '../assets/icon - calendar.svg';
import editIcon from '../assets/icon - Edit.svg';
import moreIcon from '../assets/icon - more.svg';
import showIcon from '../assets/icon - show.svg';
import clockIcon from '../assets/Clock.svg';
import dollarIcon from '../assets/Dollar.svg';
import trashIcon from '../assets/trash.svg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import img from '../assets/Messages 04.svg';

import { useDispatch } from 'react-redux';

export default function LinkedServices() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { isPending, data } = useQuery({
    queryKey: ['linkedServices'],
    queryFn: async () => {
      const { data } = await customFetch('/types');
      return data.data;
    },
  });
  const { mutate: deleteService, isPending: isPendingDeleteService } =
    useMutation({
      mutationFn: async (serviceID) => {
        const { data } = await customFetch.delete(`/types/${serviceID}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return data.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['linkedServices'] });
      },
      onError: (error) => {
        checkForUnauthorizedResponse(error, dispatch);
      },
    });
  if (isPending || isPendingDeleteService) {
    return (
      <div className='flex justify-center '>
        <span className='loading loading-infinity loading-lg '></span>
      </div>
    );
  }
  return (
    <section className='my-4 sm:my-5 flex flex-col gap-1 sm:gap-2'>
      {data?.length === 0 ? (
        <div className='flex flex-col justify-center items-center gap-3 sm:gap-5'>
          <img src={img} alt='image' className='w-48 h-48' />
          <h4>لا يوجد بيانات</h4>
        </div>
      ) : (
        data?.map((service) => (
          <div
            className='my-2 sm:my-4 py-2 sm:py-4 px-5 sm:px-10 shadow-lg border-[1px] border-[#e6e6e6] rounded-xl flex justify-between items-center gap-3 flex-wrap'
            key={service.id}
          >
            <div className='flex flex-col gap-3 sm:gap-5'>
              <div className='flex gap-3 sm:gap-6 flex-wrap'>
                <div className='flex flex-col gap-2 sm:gap-3'>
                  <div className='flex gap-1'>
                    <img src={moreIcon} alt='moreIcon' />
                    <span className='text-[#707070] text-[10px]'>
                      تفاصيل الخدمة
                    </span>
                  </div>
                  <div className='flex gap-2 flex-wrap '>
                    <span className='badge bg-[#FFF8D9] border-[1px] border-[#FFCE00] btn-wide h-10 rounded-lg'>
                      {service?.product_name?.ar}
                    </span>
                    <span className='badge bg-[#EFEFFB] border-[1px] border-[#6464DD] btn-wide h-10 rounded-lg'>
                      {service?.type_name}
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-2 sm:gap-3'>
                  <div className='flex gap-1'>
                    <img src={dollarIcon} alt='moreIcon' />
                    <span className='text-[#707070] text-[10px]'>سعر خاص</span>
                  </div>
                  <div>
                    <span className='badge bg-[#FFF1F2] border-[1px] border-[#E64646] min-w-24 h-10 rounded-lg whitespace-nowrap'>
                      {service?.product_price?.currency}
                      <span className='mx-1'>
                        {service?.product_price?.amount}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex gap-3 sm:gap-6 flex-wrap'>
                <div className='flex flex-col gap-2 sm:gap-3'>
                  <div className='flex gap-1'>
                    <img src={clockIcon} alt='moreIcon' />
                    <div className='text-[#707070] text-[10px]'>
                      <span className='ml-1'> المواعيد المتاحة </span>(
                      <span className='text-primary ml-1'>من</span>-
                      <span className='text-[#FF7A00] mr-1'>الي</span>)
                    </div>
                  </div>
                  <div className='flex gap-2 flex-wrap '>
                    <span className='badge  border-[1px] border-[#FFCE00] w-28 h-9 rounded-lg'>
                      9:00 صباحا
                    </span>
                    <span className='badge border-[1px] border-[#6464DD] w-28 h-9 rounded-lg'>
                      6:00 مساء
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-2 sm:gap-3'>
                  <div className='flex gap-1'>
                    <img src={clockIcon} alt='moreIcon' />
                    <span className='text-[#707070] text-[10px]'>
                      الأيام المتاحة
                    </span>
                  </div>
                  <div className='flex gap-2 '>
                    <span
                      className='badge bg-base-100 px-4  h-9 rounded-lg whitespace-nowrap'
                      style={{
                        boxShadow: ' 0px 4px 12px 0px rgba(0, 0, 0, 0.12)',
                      }}
                    >
                      الأثنين
                    </span>
                    <span
                      className='badge bg-base-100 px-4  h-9 rounded-lg whitespace-nowrap'
                      style={{
                        boxShadow: ' 0px 4px 12px 0px rgba(0, 0, 0, 0.12)',
                      }}
                    >
                      الثلثاء
                    </span>
                    <span
                      className='badge bg-base-100 px-4  h-9 rounded-lg whitespace-nowrap'
                      style={{
                        boxShadow: ' 0px 4px 12px 0px rgba(0, 0, 0, 0.12)',
                      }}
                    >
                      الأربعاء
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Actions */}
            <div className='flex flex-wrap gap-2'>
              <button className='w-10 h-10 flex justify-center items-center bg-base-100 shadow-md shadow-[#D9D9D9] rounded-lg'>
                <img src={editIcon} alt='editIcon' />
              </button>
              <button
                className='w-10 h-10 flex justify-center items-center bg-base-100 shadow-md shadow-[#D9D9D9] rounded-lg'
                onClick={() => deleteService(service.id)}
              >
                <img src={trashIcon} alt='trashIcon' />
              </button>
              <button className='w-10 h-10 flex justify-center items-center bg-base-100 shadow-md shadow-[#D9D9D9] rounded-lg'>
                <img src={showIcon} alt='showIcon' />
              </button>
            </div>
          </div>
        ))
      )}
      {/* <div className='my-2 sm:my-4 py-2 sm:py-4 px-5 sm:px-10 shadow-lg border-[1px] border-[#e6e6e6] rounded-xl flex justify-between items-center gap-3 flex-wrap'>
        <div className='flex flex-col gap-3 sm:gap-5'>
          <div className='flex gap-3 sm:gap-6 flex-wrap'>
            <div className='flex flex-col gap-2 sm:gap-3'>
              <div className='flex gap-1'>
                <img src={moreIcon} alt='moreIcon' />
                <span className='text-[#707070] text-[10px]'>
                  تفاصيل الخدمة
                </span>
              </div>
              <div className='flex gap-2 flex-wrap '>
                <span className='badge bg-[#FFF8D9] border-[1px] border-[#FFCE00] w-48 h-10 rounded-lg'>
                  اسم الخدمة في زد
                </span>
                <span className='badge bg-[#EFEFFB] border-[1px] border-[#6464DD] w-48 h-10 rounded-lg'>
                  عنوان الخدمة في احجزني
                </span>
              </div>
            </div>
            <div className='flex flex-col gap-2 sm:gap-3'>
              <div className='flex gap-1'>
                <img src={dollarIcon} alt='moreIcon' />
                <span className='text-[#707070] text-[10px]'>سعر خاص</span>
              </div>
              <div>
                <span className='badge bg-[#FFF1F2] border-[1px] border-[#E64646] h-10 rounded-lg whitespace-nowrap'>
                  53242.23 ر.س
                </span>
              </div>
            </div>
          </div>
          <div className='flex gap-3 sm:gap-6 flex-wrap'>
            <div className='flex flex-col gap-2 sm:gap-3'>
              <div className='flex gap-1'>
                <img src={clockIcon} alt='moreIcon' />
                <div className='text-[#707070] text-[10px]'>
                  <span className='ml-1'> المواعيد المتاحة </span>(
                  <span className='text-primary ml-1'>من</span>-
                  <span className='text-[#FF7A00] mr-1'>الي</span>)
                </div>
              </div>
              <div className='flex gap-2 flex-wrap '>
                <span className='badge  border-[1px] border-[#FFCE00] w-28 h-9 rounded-lg'>
                  9:00 صباحا
                </span>
                <span className='badge border-[1px] border-[#6464DD] w-28 h-9 rounded-lg'>
                  6:00 مساء
                </span>
              </div>
            </div>
            <div className='flex flex-col gap-2 sm:gap-3'>
              <div className='flex gap-1'>
                <img src={clockIcon} alt='moreIcon' />
                <span className='text-[#707070] text-[10px]'>
                  الأيام المتاحة
                </span>
              </div>
              <div className='flex gap-2 '>
                <span
                  className='badge bg-base-100 px-4  h-9 rounded-lg whitespace-nowrap'
                  style={{ boxShadow: ' 0px 4px 12px 0px rgba(0, 0, 0, 0.12)' }}
                >
                  الأثنين
                </span>
                <span
                  className='badge bg-base-100 px-4  h-9 rounded-lg whitespace-nowrap'
                  style={{ boxShadow: ' 0px 4px 12px 0px rgba(0, 0, 0, 0.12)' }}
                >
                  الثلثاء
                </span>
                <span
                  className='badge bg-base-100 px-4  h-9 rounded-lg whitespace-nowrap'
                  style={{ boxShadow: ' 0px 4px 12px 0px rgba(0, 0, 0, 0.12)' }}
                >
                  الأربعاء
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          <button className='w-10 h-10 flex justify-center items-center bg-base-100 shadow-md shadow-[#D9D9D9] rounded-lg'>
            <img src={editIcon} alt='' />
          </button>
          <button className='w-10 h-10 flex justify-center items-center bg-base-100 shadow-md shadow-[#D9D9D9] rounded-lg'>
            <img src={trashIcon} alt='' />
          </button>
          <button className='w-10 h-10 flex justify-center items-center bg-base-100 shadow-md shadow-[#D9D9D9] rounded-lg'>
            <img src={showIcon} alt='' />
          </button>
        </div>
      </div> */}
    </section>
  );
}
