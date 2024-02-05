'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'sonner';
import { courseState } from '../Context/ContextProvider.jsx';
import CourseList from './CourseList';

const HomePage = () => {
  const [allCourses, setAllCourses] = useState([]);
  const { setUserInfo } = courseState();
  const fetchCourses = async (req, res) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const data = await axios.get('http://localhost:3000/api/course');
      setAllCourses(data.data.courses);

      if (!data.status == 200) {
        toast('error in fetching courses');
      }
      console.log(userInfo);
    } catch (error) {
      toast('Error while fetching courses', { description: error.message });
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <CourseList courses={allCourses} />
    </div>
  );
};

export default HomePage;
