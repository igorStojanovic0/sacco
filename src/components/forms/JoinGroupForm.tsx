import { useGetProfileData } from "@/api/auth";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { GroupTypes, JoinedGroupTypes } from "@/types";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const formSchema = z.object({
    user_id: z.string().optional(),
    group_id: z.string().optional(),
});

// Determining the type of our form data by infering it from the zod schema 
export type JoinGroupFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (joinData: JoinGroupFormData) => void;
    groupList?: GroupTypes[];
    joinedGroupList?: JoinedGroupTypes[];
}

const JoinGroupForm = ({ onSave, groupList, joinedGroupList }: Props) => {

    const { currentUser } = useGetProfileData();
    const [selectedGroupId, setSelectedGroupId] = useState<string>('')

    const form = useForm<JoinGroupFormData>({
        resolver: zodResolver(formSchema),

    });

    // useEffect(() => {
    //     form.reset(currentUser);
    // }, [currentUser, form])

    const onSubmit = (joinData: JoinGroupFormData) => {
        var newData = {
            ...joinData,
            user_id: currentUser?._id,
            group_id: selectedGroupId
        }

        console.log("join", newData);

        onSave(newData)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='user_id'
                    render={({ field }) => (
                        <FormItem hidden>
                            <FormLabel>Group Tags</FormLabel>
                            <FormControl>
                                <Input defaultValue={currentUser?._id} value={currentUser?._id} hidden />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='group_id'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex flex-col gap-3 overflow-auto max-h-60">
                                    {groupList?.map((group) => (
                                        <div
                                            key={group._id}
                                            className={`flex gap-3 items-center p-2 rounded cursor-pointer active:scale-95 
								transition-all ease-in-out duration-300
							${selectedGroupId === group?._id ? "bg-green-300" : ""}`}
                                            onClick={() => {
                                                setSelectedGroupId(group?._id)
                                            }}
                                        >
                                            <Avatar className="overflow-visible">
                                                {!group?.del_flag && (
                                                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-foreground" />
                                                )}

                                                <AvatarImage
                                                    src={'/assets/group.png'}
                                                    className="rounded-full object-cover"
                                                />
                                                <AvatarFallback>
                                                    <div className="animate-pulse bg-gray-tertiary w-full h-full rounded-full"></div>
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="w-full">
                                                <div className="flex items-center justify-start w-full gap-20">
                                                    <p className="text-md font-medium w-51%">
                                                        {group?.name}
                                                    </p>
                                                    {
                                                        joinedGroupList
                                                            ?.filter((item) => item?.group_id === group._id)
                                                            .map((item) => (
                                                                <div key={item.group_id} className="flex gap-3 items-center w-[50%]">
                                                                    <span className="text-black text-[12px] bg-orange-300 p-1 rounded-2xl w-[50%]">Joined</span>
                                                                    <span className="text-blue-600 text-[13px] w-[31%]">{item?.role_name}</span>
                                                                </div>
                                                            ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button type='submit' className='text-white px-4 py-2 rounded-xl text-sm bg-blue-500 hover:bg-blue-400 font-bold'>Join</Button>
                </div>
            </form>
        </Form>
    )
}

export default JoinGroupForm