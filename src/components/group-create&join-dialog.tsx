"use client"
import { useRef } from "react"
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
// import { Input } from "./ui/input"
import { useGetProfileData } from "@/api/auth"
import { useAddGroup, useGetGroupList, useGetjoinedGroupList, useJoinGroup } from "@/api/group"
import CreateGroupForm from "./forms/CreateGroupForm"
import JoinGroupForm from "./forms/JoinGroupForm"
import { Card } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

const GroupCreateDialog = () => {
  const { currentUser } = useGetProfileData();
  const { addGroup, isLoading } = useAddGroup();
  const { allGroupList } = useGetGroupList();
  const { joinedGroupList } = useGetjoinedGroupList()
  const { joinGroup } = useJoinGroup();
  console.log('-------------joinedGroupList', joinedGroupList);
  
  const imgRef = useRef<HTMLInputElement>(null)
  const dialogCloseRef = useRef<HTMLButtonElement>(null)


  return (
    <Dialog>
      <DialogTrigger className="text-[#2f578b]">
        Group
      </DialogTrigger>
      <Card>

        <DialogContent className="bg-white">
          <DialogHeader>
            {/* TODO: <DialogClose /> will be here */}
            <DialogClose ref={dialogCloseRef} />
            <DialogTitle>Join or create a group</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="create">
            <TabsList className="text-blue-700 gap-3">
              <TabsTrigger value="create" >Create</TabsTrigger>
              <TabsTrigger value="join">Join</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-4">
              <CreateGroupForm
                onSave={addGroup}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="join" className="space-y-4">
              <JoinGroupForm
                onSave={joinGroup}
                groupList={allGroupList}
                joinedGroupList={joinedGroupList}
                // isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>

        </DialogContent>
      </Card>

    </Dialog>
  )
}
export default GroupCreateDialog