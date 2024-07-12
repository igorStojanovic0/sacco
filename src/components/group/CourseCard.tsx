"use client"
import { useGetProfileData } from "@/api/auth";
import { GroupTypes, JoinedGroupTypes } from '@/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from 'zod';
import CourseInfo from './CourseInfo';

const formSchema = z.object({
    user_id: z.string().optional(),
    group_id: z.string().optional(),
});

export type JoinGroupFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (joinData: JoinGroupFormData) => void;
    course: GroupTypes
    joinedGroupList?: JoinedGroupTypes[]
}


function CourseCard({ course, onSave, joinedGroupList }: Props) {
    const { currentUser } = useGetProfileData();

    const router = useRouter()

    const onSubmit = () => {
        var newData = {
            group_id: course?._id,
            user_id: currentUser?._id
        }
        console.log("currentUser", newData);

        onSave(newData)

    }

    return (
        <div>
            <Card className="flex flex-col h-80 shadow-md shadow-gray-300 !rounded-2xl !text-gray-800 !bg-[#eae9f4] cursor-pointer border-2 border-gray-400" >
                <div className="h-1/2 overflow-hidden">
                    <Image src={(course?.group_avatar === 'default' || !course?.group_avatar) ? '/servers/mirage.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${course?.group_avatar}`} alt={`${course?.name}`} width={500} height={250}/>
                </div>
                <div className="h-1/2 bg-[#eae9f4] overflow-hidden">
                    <CardContent className="flex flex-col flex-auto">
                        <CourseInfo course={course} />
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}

export default CourseCard;
