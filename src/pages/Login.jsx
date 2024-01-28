import React, { useEffect, useRef, useState } from 'react';
import langIcon from '../assets/Language.png';
import eye from '../assets/eye.png';
import eyeHide from '../assets/eyeHide.png';
import hand from '../assets/image 296.png';
import unCheck from '../assets/Icon - Uncheck (1).png';
import check from '../assets/Check.png';
import { Footer, InputField } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import customFetch from '../utils/axios';
import { loginUser } from '../features/user/userSlice';
export default function Login() {
  const [values, setValues] = useState([]);
  const [errors, setErrors] = useState([]);
  const [eyeClicked, setEyeClicked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);
  const passwordRef = useRef(null);
  // Handle Change
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  // React query
  const {
    mutate: loginUserM,
    data: userDataLogin,
    isPending,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await customFetch.post(
        '/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return data.data;
    },
    onSuccess: (data) => {
      dispatch(
        loginUser({
          token: data.accessToken.token,
          ...data,
        })
      );

      navigate('/');
    },
    onError: (error) => {
      setErrors((prev) => [
        ...prev,
        error?.response?.data?.message || error?.message,
      ]);
      // checkForUnauthorizedResponse(error, dispatch);
    },
  });

  // Handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      // toast.error('من فضلك أدخل جميع الحقول');
      setErrors((prev) => [...prev, 'من فضلك أدخل جميع الحقول']);
      return;
    }
    loginUserM({ email, password });
  };
  // Handle Eye logic
  const handleEyeLogic = () => {
    setEyeClicked((prev) => !prev);
    if (passwordRef.current.type === 'text') {
      passwordRef.current.type = 'password';
    } else {
      passwordRef.current.type = 'text';
    }
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
          <form
            className='bg-secondary rounded-3xl my-3 sm:my-5 py-5 sm:py-12 px-3 sm:px-5 max-w-sm mx-auto flex flex-col gap-3 shadow-xl'
            onSubmit={onSubmit}
          >
            <div className='self-center flex gap-2 items-center'>
              <h2 className='text-sm sm:text-lg font-bold'>
                مرحبا سجل دخولك للمتابعة
              </h2>
              <img src={hand} alt='hand' />
            </div>
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
            <div className='relative'>
              <InputField
                labelText='كلمة المرور'
                placeHolder='**********'
                type='password'
                name='password'
                handleChange={handleChange}
                autoComplete='current-password'
                passwordRef={passwordRef}
              />
              {eyeClicked ? (
                <img
                  src={eye}
                  alt='eye-icon'
                  className='absolute bottom-1 sm:bottom-3 left-3 w-[24px] h-[24px] cursor-pointer'
                  onClick={handleEyeLogic}
                />
              ) : (
                <img
                  src={eyeHide}
                  alt='eye-icon'
                  className='absolute bottom-1 sm:bottom-3 left-3 w-[24px] h-[24px] cursor-pointer'
                  onClick={handleEyeLogic}
                />
              )}
            </div>
            <div className='flex flex-wrap items-center justify-between'>
              <div className='flex gap-2 cursor-pointer'>
                {rememberMe ? (
                  <img
                    src={check}
                    alt='check'
                    className='w-[24px] h-[24px] '
                    onClick={() => setRememberMe((prev) => !prev)}
                  />
                ) : (
                  <img
                    src={unCheck}
                    alt='check'
                    className='w-[24px] h-[24px] '
                    onClick={() => setRememberMe((prev) => !prev)}
                  />
                )}
                <span
                  className='text-sm sm:text-lg'
                  onClick={() => setRememberMe((prev) => !prev)}
                >
                  تذكرني
                </span>
              </div>

              <Link
                to='/forget-password'
                className='underline text-sm sm:text-lg'
              >
                نسيت كلمة المرور؟
              </Link>
            </div>
            <button
              type='submit'
              className='btn btn-primary btn-sm sm:btn-md text-base-100  text-sm sm:text-xl mt-4 sm:mt-6'
              disabled={isPending}
            >
              {isPending ? (
                <span className='loading loading-spinner'></span>
              ) : (
                'تسجيل دخول'
              )}
            </button>
          </form>
        </section>
        <Footer />
      </div>
    </main>
  );
}
