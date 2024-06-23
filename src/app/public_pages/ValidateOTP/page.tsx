"use client"
import { useValidateOTP } from "@/api/auth";
import HelmetComponent from "@/components/HelmetComponent";
import { ValidateOTPForm } from "@/components/forms/ValidateOTPForm";
import { useRouter } from "next/navigation";
const ValidateOTP = () => {
  const { validateOTP, isSuccess, isLoading } = useValidateOTP();
  const router = useRouter()

  if (isSuccess) {
    router.push('/public_pages/SignIn');
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center">
      <HelmetComponent title="Verify OTP" />

      <div className="flex mx-auto w-full md:w-1/2">
        <img src="/assets/progress3.png" alt="" />
      </div>
      <div className="flex flex-col mx-auto w-full md:w-1/2">
        <h1 className="text-3xl text-center md:text-start my-3 font-bold">Verify your account</h1>
        <ValidateOTPForm onValidateOTP={validateOTP} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default ValidateOTP