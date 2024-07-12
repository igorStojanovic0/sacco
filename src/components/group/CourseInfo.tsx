"use client"

import { GroupTypes } from '@/types';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { LucideCheckCircle2 } from 'lucide-react';
import CourseCategory from './CourseCategory';

type Props = {
    course: GroupTypes
}


function CourseInfo({ course }:  Props) {
  if (!course) {
    return null;
  }

  return (
    <div className='w-full'>
      <div className="flex items-center justify-between mb-5">
        <CourseCategory slug={course.group_type} />

        {/* {course?.del_flag && ( */}
          <LucideCheckCircle2 color='white' fill='green'/>
        {/* )} */}
      </div>

      <Typography className="!text-[16px] font-medium">{course.name}</Typography>

      <Typography className="!text-[14px] line-clamp-2 !text-black" color="text.secondary">
        {course.description}
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
