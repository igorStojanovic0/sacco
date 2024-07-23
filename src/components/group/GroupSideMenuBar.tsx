"use client"
import { useGetjoinedGroupList } from "@/api/group"
import { JoinedGroupTypes } from "@/types"
import Cookies from "js-cookie"
import { LogOut, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import GeneralIcon from "../icons/GeneralIcon"

type Props = {
    toggleSideBar: () => void,
    isVisible: boolean
}

interface Group {
    createdAt: string;
    created_by: string;
    del_flag: number;
    description: string;
    group_id: string;
    group_name: string;
    group_type: string;
    role_name: string;
    tags: string;
    updatedAt: string;
    _id: string;
}

interface Groups {
    joinedList: Group[];
}

const GroupSideMenuBar = ({ toggleSideBar, isVisible }: Props) => {
    const userId = localStorage.getItem('user')
    const { joinedGroupList } = useGetjoinedGroupList();
    console.log('joined group list ', joinedGroupList);

    const [groupList, setGroupList] = useState<JoinedGroupTypes[]>([]);
    // const [isVisible, setIsVisible] = useState(true);

    // const toggleSideBar = () => {
    //     setIsVisible(!isVisible);
    // }
    useEffect(() => {
        if (joinedGroupList) {
            setGroupList(joinedGroupList);
        }
    }, []);

    const logout = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Logged out");
    }


    return (
        <div className="flex bg-[#0f172a] fixed">
            <div className="flex min-h-screen w-16 flex-col justify-between border-e">
                <div>
                    <div className="inline-flex size-16 items-center justify-center">
                        <span className="grid size-10 place-content-center rounded-lg text-xs text-gray-600">
                            <Menu onClick={toggleSideBar} size={30} color="white" />
                        </span>
                    </div>

                    <div className="flex flex-row">
                        <div className="px-2">
                            <div className="">
                                <Link href="/Group" className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-black">
                                    <GeneralIcon />
                                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                        All Groups
                                    </span>
                                </Link>
                            </div>

                            <ul className="space-y-1 pt-4">
                                {joinedGroupList?.map((group: JoinedGroupTypes) => (
                                    <li key={group?.group_id}>
                                        <Link href={`/Group/${group?.group_id}/${group?.role_name}`} className="group relative flex justify-center rounded px-2 py-1.5 text-slate-200 hover:bg-gray-50 hover:text-gray-700">
                                            <Image src={(group?.group_avatar === 'default' || !group?.group_avatar) ? '/assets/user.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${group?.group_avatar}`} height={50} width={50} alt="group avatar" className="rounded-full" />
                                            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                                {group?.group_name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}

                                <li>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="sticky inset-x-0 bottom-0 p-2">
                    {/* <form onSubmit={logout}> */}
                    <Link href="/admin/profile" className="group relative flex justify-center rounded px-2 py-1.5 text-slate-200 hover:bg-gray-50 hover:text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-5 opacity-75"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>

                        <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                            Account
                        </span>
                    </Link>
                    <button onClick={() => {
                        Cookies.remove('access-token');
                        window.location.reload();
                        // setUser(false);
                    }} type="button" className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-slate-200 hover:bg-gray-50 hover:text-gray-700">
                        <LogOut />
                        <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                            Logout
                        </span>
                    </button>
                    {/* </form> */}
                </div>
            </div>

            {/* {isVisible &&
                <div className={`hidden md:flex min-h-screen flex-1 flex-col justify-between border-e`}>
                    <div className="px-4 py-4">
                        <Link href={'/'} className="text-3xl font-bold tracking-tight text-white">
                            <Image src={'/logo.png'} width={200} height={50} alt="group" />
                        </Link>
                        <ul className="mt-6 space-y-1">
                            <li>
                                <Link href="/admin" className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                                    All Groups
                                </Link>
                            </li>

                            <li>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary
                                        className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-slate-200 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <span className="text-sm font-medium"> My Groups </span>

                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </summary>

                                    <ul className="mt-2 space-y-1 px-4">
                                        <li>
                                            <Link href="/admin/managers" className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-200 hover:bg-gray-100 hover:text-gray-700">
                                                All
                                            </Link>
                                        </li>

                                        <li>
                                            <Link href="/admin/managers/add" className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-200 hover:bg-gray-100 hover:text-gray-700">
                                                New
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            <li>
                                <Link href="/admin/teachers" className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-200 hover:bg-gray-100 hover:text-gray-700">
                                    Users
                                </Link>
                            </li>

                            <li>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-slate-200 hover:bg-gray-100 hover:text-gray-700">
                                        <span className="text-sm font-medium"> Account </span>

                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </summary>

                                    <ul className="mt-2 space-y-1 px-4">
                                        <li>
                                            <Link href="/admin/profile" className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-200 hover:bg-gray-100 hover:text-gray-700">
                                                Profile
                                            </Link>
                                        </li>

                                        <li>
                                            <form onSubmit={logout}>
                                                <button type="submit" className="w-full rounded-lg px-4 py-2 text-sm font-medium text-slate-200 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700">
                                                    Logout
                                                </button>
                                            </form>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
            } */}
        </div>
    )
}

export default GroupSideMenuBar