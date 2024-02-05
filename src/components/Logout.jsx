'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { courseState } from '../Context/ContextProvider.jsx';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = courseState();
  const handleLogout = async (req, res) => {
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/user/logout',
        {},
        { withCredentials: true }
      );
      setUserInfo('');
      router.push('/pages/auth');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default Logout;
