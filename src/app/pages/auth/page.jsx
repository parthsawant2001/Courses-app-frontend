import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Register from '@/components/Register';
import Login from '@/components/Login';

const page = () => {
  return (
    <div className='w-full h-full pt-20 flex items-center justify-center'>
      <Tabs defaultValue='register' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='register'>Register</TabsTrigger>
          <TabsTrigger value='login'>Login</TabsTrigger>
        </TabsList>
        <TabsContent value='register'>
          <Register />
        </TabsContent>
        <TabsContent value='login'>
          <Login />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
