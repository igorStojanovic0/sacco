"use client"
import { useSignIn } from "@/api/auth";
import SignInForm from "@/components/forms/SignInForm";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter()
  const { signIn, isLoading, isSuccess,  } = useSignIn(); 

  if (isSuccess) {
    // window.location.replace('/User/createUserProfile');
    window.location.replace('/')
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center">
      <div className="flex flex-col mx-auto w-full md:w-1/5 my-40">
        <h1 className="text-3xl text-white text-center md:text-start my-10 font-bold">Sign in to your account</h1>
        <SignInForm onSignIn={signIn} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default SignIn