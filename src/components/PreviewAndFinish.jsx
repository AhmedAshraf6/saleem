import React from 'react';
import menuIcon from '../assets/Icon - Menu.svg';
import circleIcon from '../assets/Icon - circle down.svg';
import chickedIcon from '../assets/icon-checked.svg';
import unChickedIcon from '../assets/icon-unchecked.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { clearServices } from '../features/user/userSlice';
export default function PreviewAndFinish({ handleToggle }) {
  const { zidProduct, ihgznyProduct } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    mutate: createType,
    data,
    isPending,
  } = useMutation({
    mutationFn: async (allTypes) => {
      const { data } = await customFetch.post('/types', allTypes, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['linkedServices'] });
      dispatch(clearServices());
      toast.success('تمت الاضافة بنجاح');
      handleToggle();
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  console.log(zidProduct);
  return (
    <div className='flex flex-col gap-3 mt-5 sm:mt-10'>
      <h3 className='text-2xl text-neutral'>خدمتك في زد</h3>
      <div className=' bg-base-100 rounded-xl border-[1px] border-[#E1E2E2] '>
        <div className=' flex justify-between flex-wrap gap-3 p-3'>
          <div className='flex items-center gap-2'>
            <img src={menuIcon} alt='menuIcon' />
            <img src={circleIcon} alt='menuIcon' />
            <span className='btn btn-sm bg-[#EFEFFB] border-[1px] border-[#6464DD] '>
              {zidProduct?.name?.ar}
            </span>
          </div>
        </div>
      </div>
      <h3 className='text-2xl text-neutral'>خدمتك في احجزني</h3>

      <div className=' bg-base-100 rounded-xl border-[1px] border-[#E1E2E2] '>
        <div className=' flex justify-between flex-wrap gap-3 p-3'>
          <div className='flex items-center gap-2'>
            <img src={menuIcon} alt='menuIcon' />
            <img src={circleIcon} alt='menuIcon' />
            <span className='btn btn-sm bg-[#EFEFFB] border-[1px] border-[#6464DD] '>
              {ihgznyProduct?.name}
            </span>
          </div>
        </div>
      </div>
      <div className='absolute bottom-[20px] left-[50%] -translate-x-[50%]'>
        <button
          className=' btn btn-primary btn-sm  rounded-3xl btn-wide md:w-[615px]'
          disabled={isPending}
          onClick={() =>
            createType({
              product_id: zidProduct.id,
              product_sku: zidProduct.sku,
              product_name: zidProduct.name,
              product_slug: zidProduct.slug,
              product_price: zidProduct.price,
              product_sale_price: zidProduct.sale_price,
              product_main_image: zidProduct.main_image,
              product_url: zidProduct.url,
              type_id: ihgznyProduct.id,
              type_on: ihgznyProduct.on,
              type_name: ihgznyProduct.name,
              type_minutes: ihgznyProduct.minutes,
              type_price: ihgznyProduct.price,
              type_oldPrice: ihgznyProduct.oldPrice,
              type_photos: ihgznyProduct.photos,
              type_bookFromWebsite: ihgznyProduct.bookFromWebsite,
              type_meta: ihgznyProduct.meta,
              type_createdAt: ihgznyProduct.createdAt,
            })
          }
        >
          {isPending ? (
            <span className='loading loading-spinner'></span>
          ) : (
            'حفظ'
          )}
        </button>
      </div>
    </div>
  );
}
