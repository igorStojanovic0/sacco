"use client"
import { useGetProfileData } from "@/api/auth"

import { User } from "@/types"
import Image from "next/image"
import Link from "next/link"
import GroupMemberListDialog from "./group-member-list"
import GroupInviteMemberDialog from "./invite-member"

type Props = {
  groupUserList?: User[];
  selectedUser?: User;
  setSelectedUser: (selectedUser: User) => void;
}
const SelectedGroupTopBar = ({groupUserList, selectedUser, setSelectedUser}: Props) => {

  const { currentUser } = useGetProfileData();

  return (
    <div className="w-full inline-flex justify-between items-center fixed h-12 p-5 z-30 bg-white shadow-md">
      <Link href={'/'}><Image src="/logo.png" width={100} height={100} alt="logo" /></Link>
      <div>
        <GroupInviteMemberDialog currentUser={currentUser} />
        <GroupMemberListDialog currentUser={currentUser} groupUserList={groupUserList} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        <></>
      </div>
    </div>
  )
}

export default SelectedGroupTopBar