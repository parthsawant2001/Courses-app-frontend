'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { courseState } from '../Context/ContextProvider.jsx';

const Login = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = courseState();
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async () => {
    setDisable(true);
    console.log(email, password);
    if (!email || !password) {
      toast('Please fill all the fields.');
    }

    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/user/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      toast('Login successfull.');
      setUserInfo(data.user);
      console.log(userInfo);
      setDisable(false);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      router.push('/');
    } catch (error) {
      console.log(error);
      setDisable(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
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
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button onClick={handleSubmit} disabled={disable}>
          {disable && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Login
        </Button>

        <Button>Cancel</Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
