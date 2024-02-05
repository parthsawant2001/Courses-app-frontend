'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const CourseContext = createContext();

const CourseProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await axios.get('http://localhost:3000/api/user', {
          withCredentials: true,
        });
        setUserInfo(data.user);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUserInfo(userInfo);

        if (!userInfo) {
          router.push('/');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [router]);

  return (
    <CourseContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const courseState = () => {
  return useContext(CourseContext);
};

export default CourseProvider;
