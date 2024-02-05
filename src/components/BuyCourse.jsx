import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import { courseState } from '../Context/ContextProvider.jsx';
import { Button } from '@/components/ui/button';

const BuyCourse = ({ params }) => {
  const router = useRouter();
  const { userInfo, setUserInfo } = courseState();

  const handleBuyCourse = async (req, res) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/user/buy/${params.id}`,
        {},
        { withCredentials: true }
      );
      toast(data.message);
      console.log(data);
      router.push('/');
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  return (
    <div>
      <Button onClick={handleBuyCourse}>Buy Course</Button>
    </div>
  );
};

export default BuyCourse;
