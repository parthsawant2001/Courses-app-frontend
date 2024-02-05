'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import EditCourse from './../../../../components/EditCourse';
import DeleteCourse from './../../../../components/DeleteCourse';
import { toast } from 'sonner';
import { courseState } from '../../../../Context/ContextProvider';
import { Button } from '@/components/ui/button';
import BuyCourse from './../../../../components/BuyCourse';

const page = () => {
  const router = useRouter();
  const [course, setCourse] = useState();
  const { userInfo, setUserInfo } = courseState();
  const params = useParams();
  const fetchCourse = async (req, res) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      router.push('/');
    }
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/course/${params.id}`,
        { withCredentials: true }
      );
      setCourse(data);
      setUserInfo(userInfo);
    } catch (error) {
      console.log(error);
      toast('Course not found', { description: error.message });
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className='p-20 flex flex-row h-full justify-center mx-12'>
      <div className='p-5 shadow-lg rounded-lg  h-full'>
        <p>{course?.image}</p>
        <p className='font-bold text-xl'>{course?.title}</p>
        <p>{course?.description}</p>
        <p className='text-gray-500'>{course?.instructor?.name}</p>
        {userInfo?._id == course?.instructor?._id ? (
          <div className='flex flex-row gap-2 mt-5'>
            <EditCourse params={params} course={course} />
            <DeleteCourse params={params} />
          </div>
        ) : (
          <div className='flex flex-row gap-2 mt-5'>
            <BuyCourse params={params} />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
