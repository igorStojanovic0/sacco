"use client"
import { useGetProfileData } from "@/api/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { iconTextGenerator } from "@/lib/iconTextGenerator";
import { User } from "@/types";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CreateUserProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [userInfo, setUserInfo] = useState<User>();
  const { currentUser } = useGetProfileData();
  const accessToken = Cookies.get('access-token');
  const router = useRouter()

  useEffect(() => {
    if (currentUser) {
      setUserInfo(currentUser)
    }
  }, [currentUser])

  useEffect(() => {
    if (userInfo) {
      if (userInfo?.is_profileCompleted) {
        router.push('/')

      } else {
        router.push('/User/createUserProfile')
      }
    }
  }, [router, userInfo])

  useEffect(() => {
    console.log(accessToken)
    if (!accessToken) {
      router.push('/auth/SignIn')
    }
  }, [])

  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-gray-800 opacity-95 z-0"></div>
      <div className="relative z-10 items-center text-center">
        <div className="sticky top-0 z-50 items-center bg-gray-900">
          <div className=" py-2 md:py-4 md:container mx-auto flex justify-between items-center">
            <Link href={'/'} className=""><Image src={'/logo.png'} width={150} height={45} alt="logo" quality={100} /></Link>
            <div className="space-x-5 flex">
              <div className="hidden md:block">
                {userInfo?._id
                  ?
                  <Popover>
                    <PopoverTrigger className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={(userInfo?.photograph === 'default' || !currentUser?.photograph) ? '/assets/user.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${userInfo?.photograph}`} className="bg-black" />
                        <AvatarFallback>{iconTextGenerator(userInfo.surName, userInfo.givenName)}</AvatarFallback>
                      </Avatar>
                      <p className="text-white">{userInfo.surName}</p>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-2 bg-[#2f578b] w-28 h-12 text-center items-center justify-center">
                      <Button variant={'secondary'} className="text-white" size={'sm'} onClick={() => {
                        Cookies.remove('access-token');
                        router.push('/auth/SignIn');
                        window.location.reload();
                        // setUser(false);
                      }}>Sign out</Button>
                    </PopoverContent>
                  </Popover>
                  :
                  <></>
                }
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
