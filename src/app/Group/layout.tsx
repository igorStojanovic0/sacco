"use client"
import GroupSideMenuBar from "@/components/group/GroupSideMenuBar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isVisible, setIsVisible] = useState(true);

  const toggleSideBar = () => {
    setIsVisible(!isVisible);
  }

  const router = useRouter()
  const access_token = Cookies.get('access-token')

  useEffect(() => {
    if (!access_token) {
      router.push('/auth/SignIn')
    }
  }, [])
  return (
    <>
      {/* <Header /> */}
      <div className="flex min-h-screen w-full ">
        <GroupSideMenuBar
          toggleSideBar={toggleSideBar}
          isVisible={isVisible}
        />
        
        {children}
      </div>
    </>
  )
}
