"use client"

import { GroupTypes } from '@/types';
import LinearProgress from '@mui/material/LinearProgress';
import clsx from 'clsx';

type Props = {
    course: GroupTypes
}
function CourseProgress({ course }: Props) {
  return (
    <LinearProgress
      className={clsx('w-full h-1')}
      variant="determinate"
    //   value={(course.progress.currentStep * 100) / course.totalSteps}
    value={70}
      color="secondary"
    />
  );
}

export default CourseProgress;
