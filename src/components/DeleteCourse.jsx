import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import { courseState } from '../Context/ContextProvider.jsx';

const DeleteCourse = ({ params }) => {
  const router = useRouter();
  const { userInfo, setUserInfo } = courseState();

  const handleDelete = async (req, res) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/course/delete/${params.id}`,
        { withCredentials: true },
        {}
      );
      toast(data.message);
      router.push('/');
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Delete Course</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this course?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' onClick={handleDelete}>
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteCourse;
