import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SettingIcon from '../assets/icons/SettingIcon';
import { useCurrencyContext } from '../store/CurrencyContext';

function Nav() {
  const [toggleNav, setToggleNav] = useState(true);

  const { currency, togglCurrency } = useCurrencyContext();

  const handleOnClick = (cur: string) => {
    setToggleNav(true);
    togglCurrency(cur);
  };

  return (
    <nav className='bg-white  drop-shadow-sm '>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link to='/crypto' className='flex items-center'>
          <img src='/logo.jpg' className='h-8 mr-3' alt='Rabbitx Logo' />
        </Link>

        <div className='flex '>
          <label className='mr-2'>Current: {currency} </label>

          <div className='relative'>
            <div
              className='w-7 cursor-pointer'
              onClick={() => setToggleNav(!toggleNav)}
            >
              <SettingIcon />
            </div>

            <div className={'absolute  ' + (toggleNav ? 'hidden' : 'block')}>
              <ul className='absolute z-50 overflow-hidden  right-0 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-sm   w-24 py-1 text-sm text-slate-700 font-semibold  '>
                <li
                  className={`py-1 px-2 flex items-center cursor-pointer  hover:bg-gray-200 ${
                    currency === 'USD' ? 'text-sky-500' : ''
                  }`}
                  onClick={() => handleOnClick('USD')}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  USD
                </li>
                <li
                  className={`py-1 px-2 flex items-center cursor-pointer  hover:bg-gray-200 ${
                    currency === 'EUR' ? 'text-sky-500' : ''
                  }`}
                  onClick={() => handleOnClick('EUR')}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  EUR
                </li>
                <li
                  className={`py-1 px-2 flex items-center cursor-pointer  hover:bg-gray-200 ${
                    currency === 'CNY' ? 'text-sky-500' : ''
                  }`}
                  onClick={() => handleOnClick('CNY')}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  CNY
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
