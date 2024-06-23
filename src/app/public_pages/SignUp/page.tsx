"use client"
import { useSignUp } from "@/api/auth";
import HelmetComponent from "@/components/HelmetComponent";
import SignUpForm from "@/components/forms/SignUpForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const SignUp = () => {
  const { signUp, isLoading, isSuccess } = useSignUp();
  const router = useRouter();
  
  useEffect(() => {
    if (isSuccess) {
      router.push('/public_pages/ValidateOTP');
    }
  },[isSuccess, router])

  return (
    <div className="flex w-full flex-wrap items-center justify-center">
      <HelmetComponent title="Create account" description="Register yourself to start applying" />
      
      <div className="flex mx-auto w-full md:w-1/2">
        <img src="/assets/progress3.png" alt="signup" />
      </div>
      <div className="flex flex-col mx-auto w-full md:w-1/2">
        <h1 className="text-3xl text-center md:text-start my-3 font-bold">Create your account now</h1>
        <SignUpForm  onSignUp={signUp} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default SignUp