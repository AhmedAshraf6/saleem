import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import eye from '../assets/eye.png';
import eyeHide from '../assets/eyeHide.png';
import langIcon from '../assets/Language.png';
import { Footer, InputField } from '../components';

export default function ResetPassword() {
  const [values, setValues] = useState({});
  const [eyeClicked, setEyeClicked] = useState(false);
  const [eyeClickedConfirmPassword, setEyeClickedConfirmPassword] =
    useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);
  // React query
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: async ({ password, password_confirmation, email, token }) => {
      const { data } = await customFetch.post(
        '/reset-password',
        { password, password_confirmation, email, token },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return data.data;
    },
    onSuccess: (data) => {
      toast.success('تم إعادة تعيين كلمة السر الخاص بك');
      navigate('/');
    },
  });

  // Handle Change
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  // Handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const { password, password_confirmation } = values;
    if (!password || !password_confirmation) {
      toast.error('من فضلك أدخل جميع الحقول');
      return;
    }
    if (password !== password_confirmation) {
      toast.error('كلمةالسر يجب أن تكون متطابقتان');
      return;
    }
    resetPassword({ password, password_confirmation, email, token });
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
  // Handle Eye logic Confirm Password
  const handleEyeLogicConfirmPassword = () => {
    setEyeClickedConfirmPassword((prev) => !prev);
    if (confirmPasswordRef.current.type === 'text') {
      confirmPasswordRef.current.type = 'password';
    } else {
      confirmPasswordRef.current.type = 'text';
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
            className='bg-secondary rounded-3xl my-3 sm:my-5 py-10 sm:py-14 px-3 sm:px-5 max-w-sm mx-auto flex flex-col gap-3 sm:gap-5 shadow-xl'
            onSubmit={onSubmit}
          >
            <h2 className='self-center text-sm sm:text-lg font-bold'>
              أدخل بريد الإلكتروني لإعادة كلمة المرور
            </h2>

            <div className='relative'>
              <InputField
                labelText='كلمة المرور الجديدة'
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
            <div className='relative'>
              <InputField
                labelText='تأكيد كلمة المرور'
                placeHolder='**********'
                type='password'
                name='password_confirmation'
                handleChange={handleChange}
                autoComplete='current-password'
                passwordRef={confirmPasswordRef}
              />
              {eyeClickedConfirmPassword ? (
                <img
                  src={eye}
                  alt='eye-icon'
                  className='absolute bottom-1 sm:bottom-3 left-3 w-[24px] h-[24px] cursor-pointer'
                  onClick={handleEyeLogicConfirmPassword}
                />
              ) : (
                <img
                  src={eyeHide}
                  alt='eye-icon'
                  className='absolute bottom-1 sm:bottom-3 left-3 w-[24px] h-[24px] cursor-pointer'
                  onClick={handleEyeLogicConfirmPassword}
                />
              )}
            </div>

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
        </section>
        <Footer />
      </div>
    </main>
  );
}
