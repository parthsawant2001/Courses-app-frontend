'use client';

import Image from 'next/image';
import Logout from './../components/Logout';
import Link from 'next/link';
import CourseList from './../components/CourseList';
import { courseState } from '../Context/ContextProvider.jsx';
import { useEffect } from 'react';
import HomePage from './../components/HomePage';

export default function Home() {
  const { userInfo, setUserInfo } = courseState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(userInfo);
  }, []);

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      <HomePage />
    </div>
  );
}
