"use client"
import { useGetProfileData, useUpdateUserAccount } from "@/api/auth";
import UserCreateProfileForm from "@/components/forms/UserCreateProfileForm";
import { User } from "@/types";
import { Card, CircularProgress, List, ListItem, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Cookies from "js-cookie";
import { BarChartIcon, CheckCircleIcon, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateUserProfile = () => {
    const { currentUser } = useGetProfileData();
    const { updateAccount, isLoading } = useUpdateUserAccount();
    const accessToken = Cookies.get('access-token');
    const router = useRouter()
    const [userInfo, setUserInfo] = useState<User>();
    const [progress, setProgress] = useState<number>(1)
    const [step, setStep] = useState<number>(1)
    const [subStep, setSubStep] = useState<number>(1)

    useEffect(() => {
        if (currentUser) {
            setUserInfo(currentUser)
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

    return (
        <>
            <div className="">
                <Card className="fixed h-[100vh] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-custom text-white">
                    <div className="mb-2 p-4 flex justify-between">
                        <Typography variant="h5" color="blue-gray">
                            Create Profile
                        </Typography>
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            <CircularProgress variant="determinate" value={progress} />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    component="div"
                                    color="text.secondary"
                                    className="text-white"
                                >{`${progress}%`}</Typography>
                            </Box>
                        </Box>
                    </div>
                    <List className="cursor-pointer space-y-5">
                        <ListItem className={`"hover:bg-green-600" ${step === 1 ? 'bg-green-600' : ''}`} onClick={() => {
                            setStep(1); setSubStep(1)
                        }}>
                            <User2Icon className="h-5 w-5" />
                            <div className="flex justify-between w-full">
                                <p>Main Info</p>
                                <CheckCircleIcon color={`${progress >= 48 ? 'green' : 'white'}`} />
                            </div>
                        </ListItem>
                        <ListItem className={`"hover:bg-green-600" ${step === 2 ? 'bg-green-600' : ''}`} onClick={() => {
                            setStep(2); setSubStep(13)
                        }}>
                            <BarChartIcon className="h-5 w-5" />

                            <div className="flex justify-between w-full">
                                <p>Financial Info</p>
                                <CheckCircleIcon color={`${progress >= 56 ? 'green' : 'white'}`} />
                            </div>
                        </ListItem>
                        <ListItem className={`"hover:bg-green-600" ${step === 3 ? 'bg-green-600' : ''}`} onClick={() => {
                            setStep(3); setSubStep(15)
                        }}>
                            <BarChartIcon className="h-5 w-5" />

                            <div className="flex justify-between w-full">
                                <p>Educational Info</p>
                                <CheckCircleIcon color={`${progress >= 60 ? 'green' : 'white'}`} />
                            </div>
                        </ListItem>
                        <ListItem className={`"hover:bg-green-600" ${step === 4 ? 'bg-green-600' : ''}`} onClick={() => {
                            setStep(4); setSubStep(16)
                        }}>
                            <BarChartIcon className="h-5 w-5" />

                            <div className="flex justify-between w-full">
                                <p>Employment Info</p>
                                <CheckCircleIcon color={`${progress >= 80 ? 'green' : 'white'}`} />
                            </div>
                        </ListItem>
                        <ListItem className={`"hover:bg-green-600" ${step === 6 ? 'bg-green-600' : ''}`} onClick={() => {
                            setStep(6); setSubStep(19)
                        }}>
                            <BarChartIcon className="h-5 w-5" />

                            <div className="flex justify-between w-full">
                                <p>Additional Enhancements</p>
                                <CheckCircleIcon color={`${progress >= 100 ? 'green' : 'white'}`} />
                            </div>
                        </ListItem>
                    </List>
                </Card>
            </div>
            <div className="ml-80">
                {currentUser && (
                    <section className="flex flex-col gap-4 fixed">
                        <div className="flex flex-col gap-4 p-5 md:p-0">
                            <UserCreateProfileForm
                                currentUser={currentUser as any}
                                onSave={updateAccount}
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
            </div>
        </>
    )
}

export default CreateUserProfile