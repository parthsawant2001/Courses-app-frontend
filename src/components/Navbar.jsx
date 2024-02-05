'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2 } from 'lucide-react';
import { Plus } from 'lucide-react';
import Logout from './Logout';
import Link from 'next/link';
import { courseState } from '../Context/ContextProvider.jsx';

const Navbar = () => {
  const { userInfo, setUserInfo } = courseState();
  return (
    <div className='bg-white absolute z-20'>
      <div className='w-screen flex flex-row justify-between shadow-md py-2 px-7 items-center'>
        <div>Logo</div>
        <div>
          <Input type='text' className='w-[450px]' placeholder='search' />
        </div>
        <div>
          {userInfo ? (
            <div className='flex flex-row'>
              <Avatar className='mr-3'>
                <AvatarImage
                  src='https://github.com/shadcn.png'
                  alt='@shadcn'
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Link href='/pages/myLearning'>
                <Button className='mr-2'>My learning</Button>
              </Link>
              <Link href='/pages/create'>
                <Button className='mr-2'>
                  Publish a course
                  <Plus className='h-4 w-4 ml-2' />
                </Button>
              </Link>
              <Logout />
            </div>
          ) : (
            <div>
              <Link href='/pages/auth'>
                <Button className='mr-3'>Login</Button>
              </Link>
              <Link href='/pages/auth'>
                <Button>Signup</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
