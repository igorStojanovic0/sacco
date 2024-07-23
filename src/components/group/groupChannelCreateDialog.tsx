"use client"
import { useGetGroupUserList } from "@/api/auth"
import { useAddGroupChannel } from "@/api/channel"
import * as Icons from '@/components/group/icons'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { User } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from "@radix-ui/react-dialog"
import axios from "axios"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const formSchema = z.object({
  name: z.string().optional(),
  group_type: z.string().optional(),
  group_state: z.string().optional(),
  tags: z.string().optional(),
  description: z.string().optional(),
  created_by: z.string().optional(),
});

export type GroupChannelFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser?: User,
}

const GroupChannelCreateDialog = ({ currentUser }: Props) => {

  const { addGroupChannel } = useAddGroupChannel();

  const params = useParams()
  const { groupUserList } = useGetGroupUserList(params?.groupId as string)

  const [selectedUsersId, setSelectedUsersId] = useState<string[]>([])
  const [groupChannelName, setGroupChannelName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [renderedImage, setRenderedImage] = useState("")

  const [userList, setUserList] = useState<any>()

  const imgRef = useRef<HTMLInputElement>(null)
  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const newUserList = groupUserList?.filter((user: any) => user?.user_id !== currentUser?._id)
    setUserList(newUserList)
  },[groupUserList])
  const form = useForm<GroupChannelFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      created_by: currentUser?._id
    }
  });

  const onSubmit = async (GroupChannelData: GroupChannelFormData) => {

    const formData = new FormData();
    let groupChannelAvatar = '';
    if (selectedImage) {
      formData.append("file", selectedImage);
      try {
        const { data: { fileName } } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/`, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        groupChannelAvatar = fileName;
        console.log("avatar", groupChannelAvatar);

      }
      catch (e) {
        console.error('File not uploaded', 'Error')
      }
    }

    var newData = {
      ...GroupChannelData,
      name: groupChannelName,
      selectedUsers_Id: selectedUsersId,
      created_by: currentUser?._id,
      channel_avatar: groupChannelAvatar === "" ? "default" : groupChannelAvatar,
      group_id: params?.groupId
    }

    console.log("ChannelData", newData);

    await addGroupChannel(newData)
  }


  useEffect(() => {
    if (!selectedImage) {
      return setRenderedImage("")
    }
    const reader = new FileReader()
    reader.onload = (e) => setRenderedImage(e.target?.result as string)
    reader.readAsDataURL(selectedImage)
  }, [selectedImage])

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="flex rounded-lg px-4 py-2  font-medium hover:bg-[#9da3ff]"
        >
          <Icons.Hashtag className='mr-1 h-5 w-5 text-gray-400' />
          New Channel
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#d4d6f3] max-w-2xl max-h-[900px]">
        <DialogHeader>
          {/* TODO: <DialogClose /> will be here */}
          <DialogClose ref={dialogCloseRef} />
          <DialogTitle>Create Channel</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 bg-[#d4d6f3]'>
            {renderedImage && (
              <div className="w-16 h-16 relative mx-auto">
                <Image
                  src={renderedImage}
                  fill
                  alt="user image"
                  className="rounded-full object-cover"
                />
              </div>
            )}
            {/* TODO: input file */}
            <input
              type="file"
              accept="image/*"
              ref={imgRef}
              hidden
              onChange={(e) => setSelectedImage(e.target.files![0])}
            />
            {selectedUsersId.length > 1 && (
              <>
                <Input
                  placeholder="Channel Name"
                  value={groupChannelName}
                  onChange={(e) => setGroupChannelName(e.target.value)}
                  className="border-[#0f172a] border-2 placeholder:text-gray-600"
                />
                <div
                  className="flex w-full gap-2 bg-[#0f172a] text-white hover:bg-gray-500 justify-center h-8 items-center rounded-lg cursor-pointer"
                  onClick={() => imgRef.current?.click()}
                >
                  <ImageIcon size={20} />
                  Channel Image
                </div>
              </>
            )}
                <div className="flex flex-col gap-3 overflow-auto max-h-[500px] max-w-screen-2xl">
                  {userList?.map((user: any) => (
                    <div
                      key={user.user_id}
                      className={`flex gap-3 items-center p-2 rounded cursor-pointer active:scale-95 
								transition-all ease-in-out duration-300
							${selectedUsersId.includes(user?.user_id) ? "bg-[#6b75e4]" : ""}`}
                      onClick={() => {
                        if (selectedUsersId.includes(user?.user_id)) {
                          setSelectedUsersId(
                            selectedUsersId.filter((id) => id !== user?.user_id)
                          )
                        } else {
                          setSelectedUsersId([...selectedUsersId, user?.user_id])
                        }
                      }}
                    >
                      <Avatar className="overflow-visible">
                        {user?.is_active && (
                          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-foreground" />
                        )}

                        <AvatarImage
                          src={(user?.photograph === 'default' || !user?.photograph) ? '/assets/user.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${user?.photograph}`}
                          className="rounded-full object-cover"
                        />
                        <AvatarFallback>
                          <div className="animate-pulse bg-gray-tertiary w-full h-full rounded-full"></div>
                        </AvatarFallback>
                      </Avatar>

                      <div className="w-full ">
                        <div className="flex items-center justify-between">
                          <p className="text-md font-medium">
                            {user.surName || user.email.split("@")[0]}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <FormField
                  control={form.control}
                  name='created_by'
                  render={({ field }) => (
                    <FormItem hidden>
                      <FormControl>
                        <Input defaultValue={currentUser?._id} value={currentUser?._id} hidden />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-between text-white">
                  <Button variant={"outline"} className="bg-[#0f172a] hover:bg-gray-500">Cancel</Button>
                  <Button
                    type='submit'
                    disabled={
                      selectedUsersId.length === 0 ||
                      (selectedUsersId.length > 1 && !groupChannelName) ||
                      isLoading
                    }
                    className="bg-[#0f172a] hover:bg-gray-500"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-t-2 border-b-2  rounded-full animate-spin" />
                    ) : (
                      "Create"
                    )}
                  </Button>
                </div>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}
export default GroupChannelCreateDialog
