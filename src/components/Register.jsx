'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { Eye } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { courseState } from '../Context/ContextProvider.jsx';

const Register = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = courseState();
  const [disable, setDisable] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = async (e) => {
    setDisable(true);
    console.log(name, email, password);
    if (!name || !email || !password || !confirmPassword) {
      toast('Please fill all the fields.');
      return;
    }
    if (password !== confirmPassword) {
      toast('Passwords do not match.');
      return;
    }

    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/user',

        { name, email, password },
        { withCredentials: true }
      );
      setUserInfo(data.user);
      setDisable(false);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      setEmail('');
      setName('');
      setPassword('');
      setConfirmPassword('');
      router.push('/');
    } catch (error) {
      console.log(error.response);
      setDisable(false);

      if (error.response.status == 409) {
        toast(error.message);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='name'
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='name'>Email</Label>
          <Input
            id='name'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='example@gmail.com'
          />
        </div>

        <div className='space-y-1'>
          <Label htmlFor='username'>Password</Label>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? 'text' : 'password'}
              placeholder='password'
            />
            <Button
              type='submit'
              onClick={() => setShow(!show)}
              variant='secondary'
            >
              <Eye className=' h-4 w-4' />
            </Button>
          </div>
        </div>
        <div className='space-y-1'>
          <Label htmlFor='username'>Confirm password</Label>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={show ? 'text' : 'password'}
              placeholder='confirm password'
            />

            <Button
              type='submit'
              onClick={() => setShow(!show)}
              variant='secondary'
            >
              <Eye className=' h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button onClick={handleSubmit} disabled={disable}>
          {disable && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Register
        </Button>

        <Button>Cancel</Button>
      </CardFooter>
    </Card>
  );
};

export default Register;
