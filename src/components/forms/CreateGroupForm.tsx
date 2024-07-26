import { useGetProfileData } from "@/api/auth";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import Select from 'react-tailwindcss-select';
import { z } from 'zod';
import LoadingButton from '../LoadingButton';
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
    name: z.string().min(2),
    group_type: z.string().optional(),
    tags: z.string().optional(),
    description: z.string().optional(),
    created_by: z.string().optional(),
});

// Determining the type of our form data by infering it from the zod schema 
export type GroupFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (values: GroupFormData) => void;
    isLoading: boolean;
};

interface SelectValue {
    value: string;
    label: string;
}

const CreateGroupForm = ({ onSave, isLoading }: Props) => {

    const { currentUser } = useGetProfileData();

    const form = useForm<GroupFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            created_by: currentUser?._id
        }
    });

    const [group_type, setGroupType] = useState<SelectValue>({
        value: 'Social' as string,
        label: 'Social' as string
    });

    // useEffect(() => {
    //     form.reset(currentUser);
    // }, [currentUser, form])
    const onSubmit = (GroupData: GroupFormData) => {
        var newData = {
            ...GroupData,
            group_type: group_type?.value
        }
        onSave(newData)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField

                    control={form.control}
                    name='created_by'
                    render={({ field }) => (
                        <FormItem hidden>
                            <FormControl>
                                <Input defaultValue={currentUser?._id} hidden />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Group Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='group_type'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Group Type</FormLabel>
                            <FormControl>
                                <Select
                                    value={group_type}
                                    onChange={(e) => setGroupType(e as SelectValue)}
                                    options={
                                        [
                                            { value: "Social", label: "Social" },
                                            { value: "Professional", label: "Professional" },
                                            { value: "Educational", label: "Educational" },
                                            { value: "Other", label: "Other" },
                                        ]
                                    }
                                    primaryColor="blue"
                                />

                            </FormControl>
                        </FormItem>
                    )}
                />
                
                <FormField
                control={form.control}
                name='tags'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Group Tags</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Group Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">

                    {isLoading ? <LoadingButton /> : <Button type='submit' className='text-white px-4 py-2 rounded-xl text-sm bg-blue-500 hover:bg-blue-400 font-bold'>Create</Button>}
                </div>
            </form>
        </Form>
    )
}

export default CreateGroupForm