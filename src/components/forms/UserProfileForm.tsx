"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingButton from '../LoadingButton';

const formSchema = z.object({
    email: z.string().optional(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().min(10, "Phone number is required")
});

// Determining the type of our form data by infering it from the zod schema 
type UserFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User;
    onSave: (UserProfileData: UserFormData) => void;
    isLoading: boolean;
};

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    });

    useEffect(() => {
        form.reset(currentUser);
    }, [currentUser, form])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className='space-y-2 bg-gray-50 rounded-lg md:p-10'>
                <FormDescription>
                    View and change your profile information here
                </FormDescription>
                <div className='flex flex-wrap w-full justify-between items-start gap-3'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled className='bg-white' />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='firstName'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='lastName'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='flex flex-wrap w-full justify-between items-start gap-3'>
                    <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {isLoading ? <LoadingButton /> : <Button type='submit' className='bg-orange-500'>Submit</Button>}
            </form>
        </Form>
    )
}

export default UserProfileForm