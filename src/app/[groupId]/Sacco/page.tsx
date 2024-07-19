"use client"
import { useGetProfileData } from '@/api/auth';
import { useGetGroupList, useJoinGroup } from "@/api/group";
import { UserSection } from "@/components/group/components/UserSection";
import CourseCard from '@/components/group/CourseCard';
import { useMyContext } from '@/context/MyContext';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function SaccoHome() {
  
  const [step, setStep] = useState<number>(1);
  const { currentUser } = useGetProfileData();
  const { groupList } = useMyContext()
  const { allGroupList } = useGetGroupList()
  const { joinGroup } = useJoinGroup();

  const params = useParams()
  let group = groupList?.find((group) => group?.group_id.toString() === params.groupId)

  return (
    <>
      {/* Channels */}
      <div className='flex w-60 flex-col bg-[#d4d6f3] justify-between'>
        <div>
          <div className='flex h-12 items-center px-3 font-title text-white shadow-md'>
            <Link href='/'><Image src={`/logo.png`} width={150} height={20} alt="logo" /></Link>
          </div>
          <Link href={`/Groups/${group?.group_id}/welcome/1`}>
            <div className='flex text-gray-700 gap-3 text-2xl font-bold justify-start items-center text-center bg-blue-300 p-3'>
              <Image className='rounded-lg' width={40} height={40} src={(group?.group_avatar === 'default' || !group?.group_avatar) ? '/servers/mirage.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${group.group_avatar}`} alt='group' />
              <span>{group?.group_name}</span>
            </div>
          </Link>
          <div className='p-3 font-medium text-black cursor-pointer hover:bg-blue-200'>
            <p className='text-black'>All Sacco</p>
          </div>
          <div className='p-3 font-medium text-black cursor-pointer hover:bg-blue-200'>
            <p className='text-black'>Joined Sacco</p>
          </div>
          <div className='p-3 font-medium text-black cursor-pointer hover:bg-blue-200'>
            <p className='text-black'>Applied Sacco</p>
          </div>
          <div onClick={() => setStep(4)} className='p-3 font-medium text-black cursor-pointer hover:bg-blue-200'>
            <p className='text-black'>Form Sacco</p>
          </div>
        </div>
        <div className="">
          <UserSection />
        </div>
      </div>

      {/* Main area */}
      {step === 1 && (
        <div className='flex flex-1 flex-col bg-[#eae9f4] items-center w-5/6'>
          <div className='overflow-y-auto p-5'>
            <Box
              className="relative overflow-hidden flex shrink-0 items-center justify-center py-48"
              height={100}
              sx={{
                backgroundColor: '#6b75e4',
                color: 'white',
              }}
            >
              <div className="flex flex-col items-center justify-center mx-auto w-full mt-8">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0 } }}>
                  <Typography color="inherit" className="!text-3xl font-semibold">
                    Connect, grow
                  </Typography>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0 } }}>
                  <Typography
                    color="inherit"
                    className="text-center !text-4xl sm:text-48 font-extrabold tracking-tight mt-4"
                  >
                    Form or Apply a Sacco

                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3 } }}
                >
                  <Typography
                    color="inherit"
                    className="!text-xl mt-12 sm:mt-24 opacity-75 tracking-tight max-w-md text-center"
                  >
                  </Typography>
                </motion.div>
              </div>

              <svg
                className="absolute inset-0 pointer-events-none"
                viewBox="0 0 960 540"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMax slice"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  className="text-gray-700 opacity-25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="100"
                >
                  <circle r="234" cx="196" cy="23" />
                  <circle r="234" cx="790" cy="491" />
                </g>
              </svg>
            </Box>
            <div className="flex flex-col w-full mx-auto pt-5">

              {useMemo(() => {
                const container = {
                  show: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                };

                const item = {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                  },
                };

                return (
                  allGroupList &&
                  (allGroupList.length > 0 ? (
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-32 sm:mt-20"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {allGroupList.map((course) => {
                        return (
                          <motion.div variants={item} key={course._id} >
                            <CourseCard course={course}
                              onSave={joinGroup}
                              joinedGroupList={groupList}
                            />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <div className="flex flex-1 items-center justify-center">
                      <Typography color="text.secondary" className="text-24 my-24">
                        No courses found!
                      </Typography>
                    </div>
                  ))
                );
              }, [groupList])}
            </div>
          </div>
        </div>
      )}
      {step === 4 && (
        <>THis is  Sacco</>
      )}
    </>
  );
}
