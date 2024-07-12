"use client"
import { useValidateOTP } from "@/api/auth";
import { ValidateOTPForm } from "@/components/forms/ValidateOTPForm";
import { useRouter } from "next/navigation";


const ValidateOTP = () => {
  const { validateOTP, isSuccess, isLoading } = useValidateOTP();
  const router = useRouter()

  if (isSuccess) {
    router.push('/auth/SignIn');
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center text-white text-center">
      <div className="flex flex-col mx-auto w-full md:w-1/5 my-40 text-center justify-center items-center">
        <h1 className="text-3xl text-center md:text-start my-3 font-bold">Verify your account</h1>
        <ValidateOTPForm onValidateOTP={validateOTP} isLoading={isLoading} />
      </div>
    </div>

  )
}

export default ValidateOTP