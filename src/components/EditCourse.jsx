'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const EditCourse = ({ params, course }) => {
  const [title, setTitle] = useState();
  const router = useRouter();
  const [description, setDescription] = useState();

  const onEditClick = () => {
    setTitle(course?.title);
    setDescription(course?.description);
  };

  const handleEdit = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/course/update/${params.id}`,
        { title, description },
        { withCredentials: true }
      );
      toast(data.message);
      router.push('/');
      console.log(data);
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={onEditClick}>Edit Course</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Title
              </Label>
              <Input
                id='name'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Description
              </Label>
              <Input
                id='username'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button type='submit' onClick={handleEdit}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCourse;
