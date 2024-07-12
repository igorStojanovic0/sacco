"use client"
import { useGetProfileData } from '@/api/auth';
import CourseCard from '@/components/group/CourseCard';
import GroupTopBar from "@/components/group/GroupTopBar";
import { FormControlLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

import { useGetGroupList, useGetjoinedGroupList, useJoinGroup } from "@/api/group";


const Data = [
    {
        id: "694e4e5f-f25f-470b-bd0e-26b1d4f64028",
        title: "Basics of Angular",
        slug: "Angular",
        description: "Introductory course for Angular and framework basics",
        category: "web",
        duration: 30,
        totalSteps: 11,
        updatedAt: "Jun 28, 2021",
        featured: true,
        progress: {
            currentStep: 3,
            completed: 2
        }
    },
    {
        id: "f924007a-2ee9-470b-a316-8d21ed78277f",
        title: "Basics of TypeScript",
        slug: "basics-of-typeScript",
        description: "Beginner course for Typescript and its basics",
        category: "web",
        duration: 60,
        totalSteps: 11,
        updatedAt: "Nov 01, 2021",
        featured: true,
        progress: {
            currentStep: 5,
            completed: 3
        }
    },
    {
        id: "0c06e980-abb5-4ba7-ab65-99a228cab36b",
        title: "Android N: Quick Settings",
        slug: "Android",
        description: "Step by step guide for Android N: Quick Settings",
        category: "android",
        duration: 120,
        totalSteps: 11,
        updatedAt: "May 08, 2021",
        featured: false,
        progress: {
            currentStep: 10,
            completed: 1
        }
    },
    {
        id: "1b9a9acc-9a36-403e-a1e7-b11780179e38",
        title: "Build an App for the Google Assistant with Firebase",
        slug: "Firebase",
        description: "Dive deep into Google Assistant apps using Firebase",
        category: "firebase",
        duration: 30,
        totalSteps: 11,
        updatedAt: "Jan 09, 2021",
        featured: false,
        progress: {
            currentStep: 4,
            completed: 3
        }
    },
    {
        id: "55eb415f-3f4e-4853-a22b-f0ae91331169",
        title: "Keep Sensitive Data Safe and Private",
        slug: "private",
        description: "Learn how to keep your important data safe and private",
        category: "android",
        duration: 45,
        totalSteps: 11,
        updatedAt: "Jan 14, 2021",
        featured: false,
        progress: {
            currentStep: 6,
            completed: 0
        }
    },
    {
        id: "fad2ab23-1011-4028-9a54-e52179ac4a50",
        title: "Manage Your Pivotal Cloud Foundry App's Using Apigee Edge",
        slug: "Edge",
        description: "Introductory course for Pivotal Cloud Foundry App",
        category: "cloud",
        duration: 90,
        totalSteps: 11,
        updatedAt: "Jun 24, 2021",
        featured: false,
        progress: {
            currentStep: 6,
            completed: 0
        }
    },
    {
        id: "c4bc107b-edc4-47a7-a7a8-4fb09732e794",
        title: "Build a PWA Using Workbox",
        slug: "workbox",
        description: "Step by step guide for building a PWA using Workbox",
        category: "web",
        duration: 120,
        totalSteps: 11,
        updatedAt: "Nov 19, 2021",
        featured: false,
        progress: {
            currentStep: 0,
            completed: 0
        }
    },
    {
        id: "1449f945-d032-460d-98e3-406565a22293",
        title: "Cloud Functions for Firebase",
        slug: "firebase",
        description: "Beginners guide of Firebase Cloud Functions",
        category: "firebase",
        duration: 45,
        totalSteps: 11,
        updatedAt: "Jul 11, 2021",
        featured: false,
        progress: {
            currentStep: 3,
            completed: 1
        }
    },
    {
        id: "f05e08ab-f3e3-4597-a032-6a4b69816f24",
        title: "Building a gRPC Service with Java",
        slug: "java",
        description: "Learn more about building a gRPC Service with Java",
        category: "cloud",
        duration: 30,
        totalSteps: 11,
        updatedAt: "Mar 13, 2021",
        featured: false,
        progress: {
            currentStep: 0,
            completed: 1
        }
    },
    {
        id: "181728f4-87c8-45c5-b9cc-92265bcd2f4d",
        title: "Looking at Campaign Finance with BigQuery",
        slug: "bigquery",
        description: "Dive deep into BigQuery: Campaign Finance",
        category: "cloud",
        duration: 60,
        totalSteps: 11,
        updatedAt: "Nov 01, 2021",
        featured: false,
        progress: {
            currentStep: 0,
            completed: 0
        }
    },
    {
        id: "fcbfedbf-6187-4b3b-89d3-1a7cb4e11616",
        title: "Personalize Your iOS App with Firebase User Management",
        slug: "management",
        description: "Dive deep into User Management on iOS apps using Firebase",
        category: "firebase",
        duration: 90,
        totalSteps: 11,
        updatedAt: "Aug 08, 2021",
        featured: false,
        progress: {
            currentStep: 0,
            completed: 0
        }
    },
    {
        id: "5213f6a1-1dd7-4b1d-b6e9-ffb7af534f28",
        title: "Customize Network Topology with Subnetworks",
        slug: "subnetworks",
        description: "Dive deep into Network Topology with Subnetworks",
        category: "web",
        duration: 45,
        totalSteps: 11,
        updatedAt: "May 12, 2021",
        featured: false,
        progress: {
            currentStep: 0,
            completed: 0
        }
    },
    {
        id: "02992ac9-d1a3-4167-b70e-8a1d5b5ba253",
        title: "Building Beautiful UIs with Flutter",
        slug: "flutter",
        description: "Dive deep into Flutter's hidden secrets for creating beautiful UIs",
        category: "web",
        duration: 90,
        totalSteps: 11,
        updatedAt: "Sep 18, 2021",
        featured: false,
        progress: {
            currentStep: 8,
            completed: 2
        }
    },
    {
        id: "2139512f-41fb-4a4a-841a-0b4ac034f9b4",
        title: "Firebase Android",
        slug: "android",
        description: "Beginners guide of Firebase for Android",
        category: "android",
        duration: 45,
        totalSteps: 11,
        updatedAt: "Apr 24, 2021",
        featured: false,
        progress: {
            currentStep: 0,
            completed: 0
        }
    },
    {
        id: "65e0a0e0-d8c0-4117-a3cb-eb74f8e28809",
        title: "Simulating a Thread Network Using OpenThread",
        slug: "openthread",
        description: "Introductory course for OpenThread and Simulating a Thread Network",
        category: "web",
        duration: 45,
        totalSteps: 11,
        updatedAt: "Jun 05, 2021",
        featured: false,
        progress: {
            currentStep: 0,
            completed: 0
        }
    },
    {
        id: "c202ebc9-9be3-433a-9d38-7003b3ed7b7a",
        title: "Your First Progressive Web App",
        slug: "web-app",
        description: "Step by step guide for creating a PWA from scratch",
        category: "web",
        duration: 30,
        totalSteps: 11,
        updatedAt: "Oct 14, 2021",
        featured: false,
        progress: {
            currentStep: 0,
            completed: 0
        }
    },
    {
        id: "980ae7da-9f77-4e30-aa98-1b1ea594e775",
        title: "Launch Cloud Datalab",
        slug: "datalab",
        description: "From start to finish: Launch Cloud Datalab",
        category: "cloud",
        duration: 60,
        totalSteps: 11,
        updatedAt: "Dec 16, 2021",
        featured: false,
        progress: {
            currentStep: 0,
            completed: 0
        }
    },
    {
        id: "c9748ea9-4117-492c-bdb2-55085b515978",
        title: "Cloud Firestore",
        slug: "firestore",
        description: "Step by step guide for setting up Cloud Firestore",
        category: "firebase",
        duration: 90,
        totalSteps: 11,
        updatedAt: "Apr 04, 2021",
        featured: false,
        progress: {
            currentStep: 2,
            completed: 0
        }
    }
]

type CourseProgress = {
    currentStep: number;
    completed: number;
};

type Course = {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    duration: number;
    totalSteps: number;
    updatedAt: string;
    featured: boolean;
    progress: CourseProgress
}



const GroupDashboard = () => {
    const [hideCompleted, setHideCompleted] = useState(false);
    const [filteredData, setFilteredData] = useState<Course[]>(Data);
    const { currentUser } = useGetProfileData();

    const { groupList } = useGetGroupList();
    const { joinedGroupList } = useGetjoinedGroupList(currentUser?._id as string)
    const { joinGroup } = useJoinGroup();

    useEffect(() => {

    }, [])

    return (
        <div className={`flex flex-col w-full bg-slate-100 ml-16`}>
            <GroupTopBar />
            <div className="">
                <div className='overflow-y-auto '>
                    <Box
                        className="relative overflow-hidden flex shrink-0 items-center justify-center py-48"
                        height={100}
                        sx={{
                            backgroundColor: '#1e293b',
                            color: 'white',
                        }}
                    >
                        <div className="flex flex-col items-center justify-center  mx-auto w-full mt-8">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0 } }}>
                                <Typography color="inherit" className="text-2xl font-semibold">
                                    TWEZIMBE GROUPS
                                </Typography>
                            </motion.div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0 } }}>
                                <Typography
                                    color="inherit"
                                    className="text-center text-4xl sm:text-48 font-extrabold tracking-tight mt-4"
                                >
                                    Which Group do you want to join today?
                                </Typography>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                            >
                                <Typography
                                    color="inherit"
                                    className="text-xl mt-12 sm:mt-24 opacity-75 tracking-tight max-w-md text-center"
                                >
                                    Our Platform will step you through the process of a building bit groups, or
                                    joining to existing groups.
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
                    <div className="flex flex-col w-full mx-auto pt-12">
                        <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
                            <div className="flex flex-col px-5 sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
                                <FormControl className="flex w-full sm:w-80" variant="outlined">
                                    <InputLabel id="category-select-label">Category</InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        label="category"
                                    //   value={selectedCategory}
                                    //   onChange={handleSelectedCategory}
                                    >
                                        <MenuItem value="Social">
                                            <em> Social </em>
                                        </MenuItem>
                                        <MenuItem value="Professional">Professional</MenuItem>
                                        <MenuItem value="Educational">Educational</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Search for a group"
                                    placeholder="Enter a keyword..."
                                    className="flex w-full sm:w-96 mx-5"
                                    // value={searchText}
                                    inputProps={{
                                        'aria-label': 'Search',
                                    }}
                                    // onChange={handleSearchText}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>

                            <FormControlLabel
                                label="Hide actived"
                                control={
                                    <Switch
                                        onChange={(ev) => {
                                            setHideCompleted(ev.target.checked);
                                        }}
                                        checked={hideCompleted}
                                        name="hideCompleted"
                                    />
                                }
                            />
                        </div>
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
                                groupList &&
                                (groupList.length > 0 ? (
                                    <motion.div
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-5 gap-12 mt-32 sm:mt-20"
                                        variants={container}
                                        initial="hidden"
                                        animate="show"
                                    >
                                        {groupList.map((course) => {
                                            return (
                                                <motion.div variants={item} key={course._id} >
                                                    <CourseCard course={course}
                                                        onSave={joinGroup}
                                                        joinedGroupList={joinedGroupList}
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
        </div>

    )
}

export default GroupDashboard