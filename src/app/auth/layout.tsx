"use client"
import { useGetProfileData } from "@/api/auth";
import { User } from '@/types';
import { HelpCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [userInfo, setUserInfo] = useState<User>();
  const { currentUser } = useGetProfileData();

  const localMenu = window.localStorage.getItem('menu')

  const [isClosed, setIsClosed] = useState(false);
  const [menu, setMenu] = useState<string>(localMenu as string)
  useEffect(() => {
    if (currentUser) {
      setUserInfo(currentUser)
    }
  }, [currentUser])

  const handleClose = () => {
    setIsClosed(!isClosed);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[url('/assets/auth-bkg-day-1.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-gray-800 opacity-80 z-0"></div>
      <div className="relative z-10 items-center text-center">
        <div className="sticky top-0 z-50 items-center">
          <div className="py-2 md:py-4 md:container mx-auto flex justify-between items-center">
            <Link href={'/'} className=""><Image src={'/logo.png'} width={150} height={45} alt="logo" quality={100} /></Link>
            <div className="space-x-5 flex">
              {/* {menu === "SignIn" && (
                <Link href={'/auth/SignUp'} onClick={() => setMenu('SignUp')} className="text-white">SignUp</Link>
              )}
              {menu === "SignUp" && (
                <Link href={'/auth/SignIn'} onClick={() => setMenu('SignIn')} className="text-white">SignIn</Link>
              )} */}
              <Link href={'/'} className="text-white flex text-center items-center gap-1"><HelpCircleIcon size={20} />Help</Link>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
