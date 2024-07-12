"use client"
import { useSignUp } from "@/api/auth";
import SignUpForm from "@/components/forms/SignUpForm";
import { CreateUserTypes } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignUp = () => {
  const { signUp, isLoading, isSuccess } = useSignUp();
  const router = useRouter();
  
  useEffect(() => {
    if (isSuccess) {
      router.push('/auth/ValidateOTP');
    }
  },[isSuccess, router])

  const handleSignUp = (values: Omit<CreateUserTypes, 'role'>) => {
    // Transform the data to include the 'role' property
    const userData: CreateUserTypes = {
      ...values,
      role: "User" // or any default role you want to assign
    };
    signUp(userData);
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-center">
    <div className="flex flex-col mx-auto w-full md:w-1/5 my-40">
      <h1 className="text-3xl text-white text-center md:text-start my-10 font-bold">Create your account now</h1>
      <SignUpForm  onSignUp={handleSignUp} isLoading={isLoading} />
    </div>
  </div>
  )
}

export default SignUp