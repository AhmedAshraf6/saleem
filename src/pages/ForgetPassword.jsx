import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import customFetch from '../utils/axios';
import { Footer, FormReSendPassword, InputField } from '../components';
import langIcon from '../assets/Language.png';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const { user } = useSelector((store) => store.user);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);
  // React query
  const {
    mutate: ForgetPassword,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ email }) => {
      const { data } = await customFetch.post(
        '/forgot-password',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return data;
    },
    onError: (error) => {
      setErrors((prev) => [
        ...prev,
        error?.response?.data?.message || error?.message,
      ]);
    },
  });
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  // Handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrors((prev) => [...prev, 'من فضلك أدخل البريد الإلكتروني']);
      return;
    }
    ForgetPassword({ email });
  };

  return (
    <main className='min-h-screen flex flex-col  justify-center'>
      <div className='align-element-login w-full flex flex-col gap-16 '>
        <section className='bg-base-100 rounded-[42px] py-7 px-6'>
          <div className=''>
            <button className='btn btn-sm btn-outline border-[#E2E8F0] text-neutral '>
              English
              <img src={langIcon} alt='langIcon' />
            </button>
          </div>
          {isSuccess ? (
            <FormReSendPassword
              email={email}
              ForgetPassword={ForgetPassword}
              isPending={isPending}
            />
          ) : (
            <form
              className='bg-secondary rounded-3xl my-3 sm:my-5 py-10 sm:py-24 px-3 sm:px-5 max-w-sm mx-auto flex flex-col gap-3 sm:gap-7 shadow-xl'
              onSubmit={onSubmit}
            >
              <h2 className='self-center text-sm sm:text-lg font-bold'>
                أدخل بريد الإلكتروني لإعادة كلمة المرور
              </h2>
              {errors.map((error, index) => (
                <h5 className='text-[#E80000] text-sm font-bold' key={index}>
                  {error}
                </h5>
              ))}
              <InputField
                labelText='البريد الالكتروني'
                placeHolder='example@domain.com'
                type='email'
                name='email'
                handleChange={handleChange}
                autoComplete='email'
              />

              <button
                type='submit'
                className='btn btn-primary btn-sm sm:btn-md text-base-100  text-sm sm:text-xl '
                disabled={isPending}
              >
                {isPending ? (
                  <span className='loading loading-spinner'></span>
                ) : (
                  'استمرار'
                )}
              </button>
              <div className='text-primary mt-1 sm:mt-3 text-center'>
                لديك حساب ؟
                <Link to='/login' className='font-semibold mx-1'>
                  تسجيل الدخول
                </Link>
              </div>
            </form>
          )}
        </section>
        <Footer />
      </div>
    </main>
  );
}
