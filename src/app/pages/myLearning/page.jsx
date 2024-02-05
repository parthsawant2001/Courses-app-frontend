'use client';

import React, { useState, useEffect } from 'react';
import { courseState } from '../../../Context/ContextProvider';
import Link from 'next/link';
import axios from 'axios';
import CourseList from './../../../components/CourseList';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const page = () => {
  const [myLearning, setMyLearning] = useState([]);
  const { setUserInfo } = courseState();
  const router = useRouter();

  const fetchMyLearning = async (req, res) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      router.push('/');
    }
    try {
      const data = await axios.get(
        'http://localhost:3000/api/user/myLearning',
        { withCredentials: true }
      );
      console.log(data.data.user.myLearning);
      setUserInfo(userInfo);
      setMyLearning(data.data.user.myLearning);

      console.log(userInfo);
    } catch (error) {
      toast('Error while fetching courses', { description: error.message });
    }
  };

  useEffect(() => {
    fetchMyLearning();
  }, []);

  return (
    <div className='pt-20'>
      <CourseList courses={myLearning} />
    </div>
  );
};

export default page;
