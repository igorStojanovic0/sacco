"use client"
import { useGetGroupUserList } from "@/api/auth";
import SelectedGroupTopBar from "@/components/group/SelectedGroupTopBar";
import GeneralIcon from "@/components/icons/GeneralIcon";
import { User } from "@/types";
import { RulerIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function GroupMainPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const params = useParams()

  const { groupUserList } = useGetGroupUserList(params?.groupId as string)
  const [selectedUser, setSelectedUser] = useState<User>()
  

  const logout = () => {

  }

  return (
    <div className={`flex flex-col w-full bg-slate-100 ml-16`}>
      <SelectedGroupTopBar groupUserList={groupUserList} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      <div className="">
        <div className="mt-12 flex">
          <div className={`w-80 bg-blue-200 md:flex min-h-screen justify-between border-e pt-10`}>
            <ul className="space-y-1 fixed">
              <li>
                <Link href="#" className="flex gap-3 rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                  <RulerIcon />
                  Rules
                </Link>
              </li>
              <li>
                <Link href="#" className="flex gap-3 rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                  <GeneralIcon />
                  Announcements
                </Link>
              </li>
              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary
                    className="flex cursor-pointer items-center justify-start gap-3 rounded-lg px-4 py-2 text-black hover:bg-gray-100 hover:text-gray-700"
                  ><GeneralIcon />
                    <span className="text-sm font-medium"> Profile </span>

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

                  <ul className="space-y-1 px-7">
                    <li>
                      <Link href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                        Main Info
                      </Link>
                    </li>

                    <li>
                      <Link href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                        Membership Info
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                        Group Activity&Engagement
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                        Administrative Info
                      </Link>
                    </li>

                    <li>
                      <Link href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                        Communication Tools
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                        Integration Info
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                        Security&Compliance
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                        Analytics&Reporting
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary
                    className="flex cursor-pointer items-center justify-start gap-3 rounded-lg px-4 py-2 text-black hover:bg-gray-100 hover:text-gray-700"
                  ><GeneralIcon />
                    <span className="text-sm font-medium"> Channels </span>

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

                  <ul className=" px-7 space-y-1">
                    <li>
                      <Link href={`/Group/${params?.group_id}/`} className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                        General
                      </Link>
                    </li>

                    <li>
                      <Link href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                        Random
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                        Add Channel
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary
                    className="flex gap-3 cursor-pointer items-center rounded-lg px-4 py-2 text-black hover:bg-gray-100 hover:text-gray-700"

                  ><GeneralIcon />
                    <span className="text-sm font-medium"> Direct Messages </span>

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

                  <ul className="space-y-1  px-7">
                    <li>
                      <Link href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700">
                        Add coworkers
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <div>
            {children}
            
          </div>
        </div>
      </div>
    </div>

  )
}

