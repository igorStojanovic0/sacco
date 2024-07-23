"use client"
import { useRef } from "react"
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
// import { Input } from "./ui/input"
import { useGetProfileData } from "@/api/auth"
import { useAddGroup, useGetjoinedGroupList, useJoinGroup } from "@/api/group"
import CreateGroupForm from "../forms/CreateGroupForm"
import { Card } from "../ui/card"

type Props = {
  isVisible: boolean
}

const GroupCreateDialog = ({isVisible}: Props) => {
  const { currentUser } = useGetProfileData();
  const { addGroup, isLoading } = useAddGroup();
  // const { groupList } = useGetGroupList();
  const { joinedGroupList } = useGetjoinedGroupList()
  const { joinGroup } = useJoinGroup();
  console.log('-------------joinedGroupList', joinedGroupList);

  const imgRef = useRef<HTMLInputElement>(null)
  const dialogCloseRef = useRef<HTMLButtonElement>(null)


  return (
    <Dialog>
      <DialogTrigger className="text-[#2f578b]">
        <div
          className={`px-8 ${isVisible? "mr-72" : "mr-14"} bg-[#1e293b] rounded-md text-white py-2 hover:bg-slate-800`}
          color="secondary"
          // variant="contained"
          // endIcon={
          //   <PlusCircleIcon />
          
          // }
        >
          Create
        </div>
    
      </DialogTrigger>
      <Card>

        <DialogContent className="bg-white">
          <DialogHeader>
            {/* TODO: <DialogClose /> will be here */}
            <DialogClose ref={dialogCloseRef} />
            <DialogTitle>Create a group</DialogTitle>
          </DialogHeader>
          <CreateGroupForm
            onSave={addGroup}
            isLoading={isLoading}
          />
        </DialogContent>
      </Card>

    </Dialog>
  )
}
export default GroupCreateDialog