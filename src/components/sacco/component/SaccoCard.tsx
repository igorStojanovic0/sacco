"use client"
import { useGetProfileData } from "@/api/auth";
import { SaccoTypes } from '@/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { z } from 'zod';
import CourseInfo from './CourseInfo';

const formSchema = z.object({
    user_id: z.string().optional(),
    group_id: z.string().optional(),
});

export type JoinGroupFormData = z.infer<typeof formSchema>;

type Props = {
    onSave?: (joinData: any) => void;
    course: SaccoTypes
    joinedSaccoList?: SaccoTypes[]
}


function SaccoCard({ course, onSave, joinedSaccoList }: Props) {
    const { currentUser } = useGetProfileData();
    const [saccoDetailFlag, setSaccoDetailFlag] = useState<boolean>(false)

    const router = useRouter()

    const onSubmit = () => {
        var newData = {
            group_id: course?._id,
            user_id: currentUser?._id
        }
        console.log("currentUser", newData);

        // onSave(newData)

    }

    return (
        <div>
            <Card onClick={() => {
                setSaccoDetailFlag(true)
            }} className="flex flex-col h-80 shadow-md shadow-gray-300 !rounded-2xl !text-gray-800 !bg-[#eae9f4] cursor-pointer border-2 border-gray-400" >
                <div className="h-1/2 overflow-hidden">
                    <Image src={`/servers/sacco.png`} alt={`${course?.name}`} width={500} height={250} />
                </div>
                <div className="h-1/2 bg-[#eae9f4] overflow-hidden">
                    <CardContent className="flex flex-col flex-auto">
                        <CourseInfo course={course} joinedSaccoList={joinedSaccoList} />
                    </CardContent>
                </div>
            </Card>
            {saccoDetailFlag && (
                <div className='absolute w-1/3 top-0 right-0 bg-[#e1e4f5] h-[calc(100vh-50px)] text-black'>
                    <div className='justify-between flex p-5'>
                        <span className='text-3xl'>Profile</span>
                        <button onClick={() => setSaccoDetailFlag(false)}><AiFillCloseCircle fontSize={30} /></button>
                    </div>
                    <div className="m-10 space-y-3">
                        <div className='text-2xl'>Name:  {course?.name}</div>
                        <div className='text-2xl'>Entrance Fee:</div>
                        <div className="ml-10">
                            <div className='text-xl'>adults: {course?.entranceFee.adults}</div>
                            <div className='text-xl'>children: {course?.entranceFee.children}</div>
                            <div className='text-xl'>teens: {course?.entranceFee.teens}</div>
                            <div className='text-xl'>friend: {course?.entranceFee.friend}</div>
                        </div>
                        <div className='text-2xl'>Entrance Fee:</div>
                        <div className="ml-10">
                            <div className='text-xl'>adults: {course?.entranceFee.adults}</div>
                            <div className='text-xl'>children: {course?.entranceFee.children}</div>
                            <div className='text-xl'>teens: {course?.entranceFee.teens}</div>
                            <div className='text-xl'>friend: {course?.entranceFee.friend}</div>
                        </div>
                        <div className='text-2xl'>Entrance Fee:</div>
                        <div className="ml-10">
                            <div className='text-xl'>adults: {course?.entranceFee.adults}</div>
                            <div className='text-xl'>children: {course?.entranceFee.children}</div>
                            <div className='text-xl'>teens: {course?.entranceFee.teens}</div>
                            <div className='text-xl'>friend: {course?.entranceFee.friend}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default SaccoCard;
