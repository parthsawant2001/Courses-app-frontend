'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'sonner';
import { courseState } from '../Context/ContextProvider.jsx';

const CourseList = ({ courses }) => {
  return (
    <div>
      <div className='flex flex-col-reverse'>
        {courses?.map((course) => {
          return (
            <Link key={course?._id} href={`/pages/course/${course?._id}`}>
              <div className='w-[80%] p-5 flex rounded-2xl m-5 shadow-lg hover:shadow-xl'>
                <div>
                  <Image
                    className='object-contain self-center rounded-md h-[200px]'
                    width={400}
                    height={400}
                    src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freecodecamp.org%2Fnews%2Flearn-the-mern-stack-tutorial%2F&psig=AOvVaw1rWNYMatZDpPS4vJJ2L6eY&ust=1707057745077000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPDc4uWzj4QDFQAAAAAdAAAAABAE'
                    alt={course?.title}
                  />
                </div>
                <div className='p-5'>
                  <p className='text-xl font-bold'>{course?.title}</p>
                  <p>{course?.description}</p>
                  <p className='text-gray-500'>{course?.instructor?.name}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CourseList;
