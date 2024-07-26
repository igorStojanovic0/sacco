"use client"

import { SaccoTypes } from '@/types';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { LucideCheckCircle2 } from 'lucide-react';
import CourseCategory from './CourseCategory';

type Props = {
  course: SaccoTypes
  joinedSaccoList?: SaccoTypes[]
  isApproved: number | undefined
}


function CourseInfo({ course, joinedSaccoList, isApproved }: Props) {
  if (!course) {
    return null;
  }

  

  return (
    <div className='w-full'>
      <div className="flex items-center justify-between mb-5">
        <CourseCategory slug={course.loanType} />

        {/* {course?.del_flag && ( */}
        {isApproved === 1 ? (
          <LucideCheckCircle2 color='white' fill='green' />
        ) : (<></>)}

        {/* )} */}
      </div>

      <Typography className="!text-[16px] font-medium">{course.name}</Typography>

      <Typography className="!text-[14px] line-clamp-2 !text-black" color="text.secondary">
        {course.traningProgram}
      </Typography>

      <Divider className="w-48 my-10 border-1" light />

      <Typography className="flex items-center space-x-3 text-13" color="text.secondary">

      </Typography>
      <Typography className="flex items-center space-x-3 text-13 mt-3" color="text.secondary">

      </Typography>
    </div>
  );
}

export default CourseInfo;
