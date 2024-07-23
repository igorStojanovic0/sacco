"use client"
import { useGetjoinedSaccoList, useGetSaccoList, useJoinSacco } from "@/api/sacco";
import SaccoCard from '@/components/sacco/component/SaccoCard';
import { useMyContext } from '@/context/MyContext';
import { SaccoTypes } from "@/types";
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";

export default function SaccoHome() {

  const params = useParams()
  
  const { groupList, saccoCategory } = useMyContext()
  const { allSaccoList } = useGetSaccoList()
  const { joinedSaccoList } = useGetjoinedSaccoList()
  const { joinSacco } = useJoinSacco();
  const [allsaccoListByGroup, setAllsaccoListByGroup] = useState<SaccoTypes[] | undefined>([])
  const [joinedSaccoListByGroup, setJoinedSaccoListByGroup] = useState<SaccoTypes[] | undefined>([])
  const [appliedSaccoListByGroup, setAppliedSaccoListByGroup] = useState<SaccoTypes[] | undefined>([])

  
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

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    const temp = allSaccoList?.filter((sacco: SaccoTypes) => sacco?.group_id === params?.groupId)
    setAllsaccoListByGroup(temp)
  }, [allSaccoList, saccoCategory])

  useEffect(() => {
    const temp = joinedSaccoList?.filter((sacco: SaccoTypes) => sacco?.group_id === params?.groupId && sacco?.approved === 1)
    const temp1 = joinedSaccoList?.filter((sacco: SaccoTypes) => sacco?.group_id === params?.groupId && sacco?.approved === 0)
    setJoinedSaccoListByGroup(temp)
    setAppliedSaccoListByGroup(temp1)
  }, [joinedSaccoList, saccoCategory])

  return (
    <>
      {/* Main area */}
      {saccoCategory === 1 && (
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
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-32 sm:mt-20"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {allsaccoListByGroup?.map((course: any) => {
                  return (
                    <motion.div variants={item} key={course._id} >
                      <SaccoCard course={course}
                        onSave={joinSacco}
                        joinedSaccoList={joinedSaccoListByGroup}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      )}
      {saccoCategory === 2 && (
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
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-32 sm:mt-20"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {joinedSaccoListByGroup?.map((course: any) => {
                  return (
                    <motion.div variants={item} key={course._id} >
                      <SaccoCard course={course}
                        // onSave={joinGroup}
                        joinedSaccoList={joinedSaccoList}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      )}
      {saccoCategory === 3 && (
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
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-32 sm:mt-20"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {appliedSaccoListByGroup?.map((course: any) => {
                  return (
                    <motion.div variants={item} key={course._id} >
                      <SaccoCard course={course}
                        // onSave={joinGroup}
                        joinedSaccoList={joinedSaccoList}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
