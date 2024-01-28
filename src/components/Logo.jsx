import logo from '../assets/smallLogo.svg';

export default function Logo() {
  return (
    <img src={logo} alt='logo' className='w-[65px] h-[46px] object-contain' />
  );
}
