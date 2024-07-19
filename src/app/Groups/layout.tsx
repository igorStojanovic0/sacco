"use client"
import { useGetjoinedGroupList } from '@/api/group';
import { useMyContext } from '@/context/MyContext';
import '@/styles/globals.css';
import '@/styles/styles.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import GroupNav from './group-nav';

export default function GroupsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const access_token = Cookies.get('access-token')
  const { userEnter,setGroupList } = useMyContext()
  const { joinedGroupList } = useGetjoinedGroupList()
  
  useEffect(() => {
    setGroupList(joinedGroupList)
  }, [joinedGroupList])
  
  useEffect(() => {
    if (!access_token) {
      router.push('/auth/SignIn')
    }
  }, [])

  useEffect(() => {
    userEnter('C2S_USER_ENTER', `allGroups`)
  },[])
  return (
        <div className='flex h-screen text-gray-100'>
          <GroupNav />
          {children}
        </div>
  );
}
