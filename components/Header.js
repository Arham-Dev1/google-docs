import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DescriptionIcon from '@material-ui/icons/Description';
import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import { getSession, signOut, useSession } from "next-auth/client"

const Header = () => {
  const [session] = useSession();
  const myArray = session.user.name.split(" ");

  return (
    <header className="p-2 shadow-md sticky top-0 bg-white z-50">
      <div className="grid grid-cols-4">

        {/* LEFT PART OF NAVBAR */}
        <div className="flex items-center col-span-1">
          <IconButton>
            <MenuIcon />
          </IconButton>
          <div className="text-[#2196f3] flex items-center space-x-2 ml-3">
            <DescriptionIcon fontSize="large" />
            <p className="hidden xl:inline-flex text-xl text-gray-500 font-bold">Google</p>
              <p className="hidden xl:inline-flex text-xl text-gray-500 font-semibold">Docs</p>
          </div>
        </div>

        {/* MIDDLE PART OF NAVBAR */}
        <div className="col-span-2">
          <div className="bg-gray-100 rounded-lg hidden md:inline-flex w-full items-center space-x-1 text-gray-500 focus-within:text-gray-600 focus-within:shadow-md">
            <IconButton>
              <SearchIcon />
            </IconButton>
            <input type="text" className="flex-grow outline-none bg-transparent" />
          </div>
        </div>

        {/* RIGHT PART OF NAVBAR */}
        <div className="flex items-center col-span-1 justify-end space-x-1">
          <div className="inline-block md:hidden">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <IconButton>
            <AppsIcon />
          </IconButton>
          <Tooltip title="Logout" placement="right" >
            <div className='flex flex-col items-center' onClick={signOut}>
              <img src={session.user.image} className='hidden md:inline-flex cursor-pointer h-[30px] w-[30px] rounded-full' alt="Profile" referrerPolicy="no-referrer" />
              <h2 className='text-sm cursor-default font-semibold'>{myArray[0]}</h2>
            </div>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}

export default Header;
