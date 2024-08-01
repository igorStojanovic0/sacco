"use client"
import { useGetProfileData } from '@/api/auth';
import { useGetjoinedGroupList } from '@/api/group';
import { useMyContext } from '@/context/MyContext';
import '@/styles/globals.css';
import '@/styles/styles.css';
import { User } from '@/types';
import Cookies from 'js-cookie';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import GroupNav from './group-nav';

export default function GroupsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setGroupList } = useMyContext()
  const router = useRouter()
  const access_token = Cookies.get('access-token')
  const { joinedGroupList } = useGetjoinedGroupList();
  const { userEnter } = useMyContext()
  const { currentUser } = useGetProfileData();
  const [userInfo, setUserInfo] = useState<User>();
  const params = useParams()

  useEffect(() => {
    if (currentUser) {
      setUserInfo(currentUser)
    }
  }, [currentUser])

  useEffect(() => {
    if (userInfo) {
      if (userInfo?.is_profileCompleted) {
        // router.push(`/${params?.groupId}/Sacco`)
        return;

      } else {
        router.push('/User/createUserProfile')
      }
    }
  }, [router, userInfo])


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
  }, [])

  return (
    <div className='flex h-screen text-gray-100'>
      <GroupNav />
      {children}
    </div>
  );
}
