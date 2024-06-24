import { useForgotPassword } from "@/api/auth";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

const ForgotPassword = () => {
  const { forgotPassword, isLoading, isSuccess } = useForgotPassword();

  if (isSuccess) {
    window.location.replace('/signin');
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center">
      {/* <HelmetComponent title="Forgot Password" /> */}

      <div className="flex mx-auto w-full md:w-1/2">
        <img src="/assets/progress3.png" alt="forgot password" />
      </div>
      <div className="flex flex-col mx-auto w-full md:w-1/2">
        <h1 className="text-3xl text-center md:text-start my-3 font-bold">Forgot your password?</h1>
        
        <ForgotPasswordForm 
          onForgotPassword={forgotPassword} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  )
}

export default ForgotPassword