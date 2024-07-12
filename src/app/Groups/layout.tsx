"use client"
import { useGetjoinedGroupList } from '@/api/group';
import { useMyContext } from '@/context/MyContext';
import '@/styles/globals.css';
import '@/styles/styles.css';
import { JoinedGroupTypes } from '@/types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import GroupNav from './group-nav';

export default function GroupsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setGroupList } = useMyContext()
  const router = useRouter()
  const access_token = Cookies.get('access-token')
  const userId = localStorage.getItem('user')
  const { joinedGroupList } = useGetjoinedGroupList(userId as string);
  
  if(joinedGroupList !== undefined || joinedGroupList !== 'undefined') {
    setGroupList(joinedGroupList as JoinedGroupTypes[])
  }
  
  useEffect(() => {
    if (!access_token) {
      router.push('/auth/SignIn')
    }
  }, [])
  return (
        <div className='flex h-screen text-gray-100'>
          <GroupNav />
          {children}
        </div>
  );
}
