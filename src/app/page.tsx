"use client"
import { useGetProfileData } from "@/api/auth";
import HelmetComponent from "@/components/HelmetComponent";
import About from "@/components/landingPage/About";
import Feature from "@/components/landingPage/Feature";
import Hero from "@/components/landingPage/Hero";
import Layout from "@/components/landingPage/Layout/Layout";
import { User } from "@/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./slick.css";
import "./tailwind.css";


export default function Home() {

  const [userInfo, setUserInfo] = useState<User>();
  const { currentUser } = useGetProfileData();
  const accessToken = Cookies.get('access-token');
  const router = useRouter()

  useEffect(() => {
    if (currentUser) {
      setUserInfo(currentUser)
      window.localStorage.setItem('user', currentUser?._id)
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
      router.push('/')
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <HelmetComponent title="Welcome to Twezimbe" description="The quickest way to apply for a Loan in SACCO" />
      {/* <Header />
      <Hero/>
      <FastAndEffiscient />
      <FeedBack />
      <Footer/> */}
      <Layout>
        <Hero />
        <Feature />
        <About />
      </Layout>
    </div>
  );
}
