"use client"

import { useGetProfileData } from "@/api/auth";
import { useAddSacco } from "@/api/sacco";
import SaccoCreateProfileForm from "@/components/sacco/SaccoCreateProfileForm";
import { User } from "@/types";
import Cookies from "js-cookie";
import { useState } from "react";

const SaccoDashboard = () => {

    const { currentUser } = useGetProfileData();
    const { addSacco, isLoading } = useAddSacco()
    const accessToken = Cookies.get('access-token');
    const [userInfo, setUserInfo] = useState<User>();
    const [progress, setProgress] = useState<number>(1)
    const [step, setStep] = useState<number>(1)
    const [subStep, setSubStep] = useState<number>(1)

    return (
        <>
            {currentUser && (
                <section className="flex flex-col gap-4 fixed">
                    <div className="flex flex-col gap-4 p-5 md:p-0 mt-5 text-black">
                        <SaccoCreateProfileForm
                            currentUser={currentUser as any}
                            onSave={addSacco}
                            isLoading={isLoading}
                            step={step}
                            setStep={setStep}
                            subStep={subStep}
                            setSubStep={setSubStep}
                            progress={progress}
                            setProgress={setProgress}
                        />
                    </div>
                </section>
            )}
        </>
    )
}

export default SaccoDashboard