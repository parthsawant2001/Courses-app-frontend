'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { courseState } from '../../../Context/ContextProvider';

const page = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const { setUserInfo } = courseState();
  const router = useRouter();
  let image = 'image';

  const handleCreate = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/course/create`,
        { image, title, description },
        { withCredentials: true }
      );
      toast(data.message);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      router.push('/');
    }
    setUserInfo(userInfo);
  }, []);

  return (
    <div className='flex flex-row w-full h-full items-center justify-center p-[200px]'>
      <div className='w-[30%]'>
        <Label htmlFor='name' className='text-right'>
          Title
        </Label>
        <Input
          id='name'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className='col-span-3'
        />
        <Label htmlFor='description' className='text-right'>
          Description
        </Label>
        <Textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Type your message here.'
        />

        <Button className='mt-2' onClick={handleCreate}>
          Publish
        </Button>
      </div>
    </div>
  );
};

export default page;
