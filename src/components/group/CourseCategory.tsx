"use client"

import Chip from '@mui/material/Chip';

type Props = {
    slug: string
}
function CourseCategory({ slug }: Props) {


  return (
    <Chip
      className="font-semibold text-12 !bg-blue-300"
      label={slug}
      size="small"

    />
  );
}

export default CourseCategory;
