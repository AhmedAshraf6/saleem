import React from 'react';

export default function Table() {
  return (
    <div class='table relative overflow-x-auto mt-10 [box-shadow:0px_4px_12px_0px_rgba(0,_0,_0,_0.12)] p-3'>
      <table class='w-full text-sm text-left rtl:text-right '>
        <thead class='text-primary uppercase border-b-2 border-[#9494c1] '>
          <tr>
            <th scope='col' class='px-6 py-3'>
              ID احجزلي
            </th>
            <th scope='col' class='px-6 py-3'>
              ID زد
            </th>
            <th scope='col' class='px-6 py-3'>
              اسم الحجز
            </th>
            <th scope='col' class='px-6 py-3'>
              الحالة
            </th>
            <th scope='col' class='px-6 py-3'>
              اسم المستخدم
            </th>
            <th scope='col' class='px-6 py-3'>
              رقم الجوال
            </th>
            <th scope='col' class='px-6 py-3'>
              القيمة (ر.س)
            </th>
            <th scope='col' class='px-6 py-3'>
              تاريخ الحجز
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class='bg-white text-xs'>
            <th scope='row' class=' font-medium  whitespace-nowrap '>
              6543222
            </th>
            <td class=''>12454</td>
            <td class=''>حجز طبيب</td>
            <td class=' '>
              <span className='rounded-xl w-16 h-8 flex justify-center items-center bg-[#D4EEDE] border-[1px] text-[#18CB5F] border-[#18CB5F]'>
                مقبول
              </span>
            </td>
            <td class=''>mohamed</td>
            <td class=''>0533245492</td>
            <td class=''>1255</td>
            <td class=''>01/12/2023</td>
          </tr>
          <tr class='bg-white text-xs'>
            <th scope='row' class=' font-medium  whitespace-nowrap '>
              6543222
            </th>
            <td class=''>12454</td>
            <td class=''>حجز طبيب</td>
            <td class=' '>
              <span className='rounded-xl w-16 h-8 flex justify-center items-center bg-[#FFF1F2] border-[1px] text-[#E80000] border-[#E80000]'>
                ملغي
              </span>
            </td>
            <td class=''>mohamed</td>
            <td class=''>0533245492</td>
            <td class=''>1255</td>
            <td class=''>01/12/2023</td>
          </tr>
          <tr class='bg-white text-xs'>
            <th scope='row' class=' font-medium  whitespace-nowrap '>
              6543222
            </th>
            <td class=''>12454</td>
            <td class=''>حجز طبيب</td>
            <td class=' '>
              <span className='rounded-xl w-16 h-8 flex justify-center items-center bg-[#D4EEDE] border-[1px] text-[#18CB5F] border-[#18CB5F]'>
                مقبول
              </span>
            </td>
            <td class=''>mohamed</td>
            <td class=''>0533245492</td>
            <td class=''>1255</td>
            <td class=''>01/12/2023</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
