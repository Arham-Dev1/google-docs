import { signIn } from 'next-auth/client';
import GoogleButton from 'react-google-button'
import React from 'react';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DescriptionIcon from '@material-ui/icons/Description';

const Login = () => {
  return (
    <>
      <title>
        Google Docs - Login
      </title>
      <header className="p-2 shadow-md sticky top-0 bg-white z-50">
        <div className="grid grid-cols-4">
          <div className="flex items-center col-span-1">
            <IconButton>
              <MenuIcon />
            </IconButton>
            <div className="text-[#2196f3] flex items-center space-x-2">
              <DescriptionIcon fontSize="large" />
              <p className="text-xl text-gray-500 font-bold">Google</p>
              <p className="text-xl text-gray-500 font-semibold">Docs</p>
            </div>
          </div>
        </div>
      </header>
      <div className='my-6 p-8 flex w-full flex-col md:flex-row md:justify-between'>
        <div className='max-w-max font-extrabold text-5xl mt-5'>
          <p>Build your best </p>
          <p>ideas together, </p>
          <p>in <span className='text-[#2196f3]'>Google Docs</span></p>
          <p className='mt-8 font-normal xl:text-xl text-sm text-gray-400'>Create and collaborate on online documents in real-time and from any device.</p>
          <GoogleButton 
          type="light"
          className='mt-10 mx-auto md:mx-0'
          onClick={() => signIn("google")}
          />
        </div>
        <div>
          <img src="loginImg.png" className='max-w-xs mt-4 md:mt-0 md:max-w-2xl' />
        </div>
      </div>
    </>
  );
}

export default Login;
