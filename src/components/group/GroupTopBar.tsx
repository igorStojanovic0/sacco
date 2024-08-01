"use client"
import { useGetProfileData } from "@/api/auth"

import Link from "next/link"
import GroupCreateDialog from "./group-create-dialog"

const GroupTopBar = () => {

  const { currentUser } = useGetProfileData();

  return (
    <div className="w-full inline-flex justify-between items-center fixed h-12 p-5 z-30 bg-white shadow-md">
      {/* <h2 className="inline font-bold text-blue-950">Group <span className="text-gray-500 font-normal">/Dashboard</span></h2> */}
      {/* <button className="bg-black text-white px-3 py-2 rounded-lg hover:bg-slate-600">Logout</button> */}

      {/* <div>
        </div> */}
      <Link href={'/'}><img src="/logo.png" width={100} height={100} alt="logo" /></Link>
      <div>
        <GroupCreateDialog currentUser={currentUser} />
        <></>
      </div>
    </div>
  )
}

export default GroupTopBar