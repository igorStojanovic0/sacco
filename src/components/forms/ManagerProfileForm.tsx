import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingButton from '../LoadingButton';

const phoneRegex = /^\+\d{1,3}-\d{3}-\d{6}$/;

const formSchema = z.object({
    email: z.string().optional(),
    surName: z.string().min(1, "First name is required"),
    givenName: z.string().min(1, "Last name is required"),
    phone: z.string().optional().refine((val) => val === undefined || val === "" || phoneRegex.test(val), {
        message: "Phone number must include country code and be formatted correctly"
    }),
});

// Determining the type of our form data by infering it from the zod schema 
type ManagerFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User;
    onSave: (ManagerProfileData: ManagerFormData) => void;
    isLoading: boolean;
};

const ManagerProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
    const form = useForm<ManagerFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    });

    useEffect(() => {
        form.reset(currentUser);
    }, [currentUser, form])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className='space-y-2 bg-white rounded-lg md:p-10'>
                <FormDescription>
                    View and change your profile information here
                </FormDescription>
                <div className='flex justify-between items-center flex-wrap'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className='w-[49%]'>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled className='bg-white' />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='surName'
                        render={({ field }) => (
                            <FormItem className='w-[49%]'>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='flex justify-between items-center flex-wrap'>
                    <FormField
                        control={form.control}
                        name='givenName'
                        render={({ field }) => (
                            <FormItem className='w-[49%]'>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => (
                            <FormItem className='w-[49%]'>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' placeholder='+256-000-000000'/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {isLoading ? <LoadingButton /> : <Button type='submit' className='bg-[rgb(50,86,166)]'>Submit</Button>}
            </form>
        </Form>
    )
}

export default ManagerProfileForm