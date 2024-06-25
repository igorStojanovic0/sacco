import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from "@/lib/utils";
import { Application, UpdateApplicationTypes } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from "date-fns";
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingButton from '../LoadingButton';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formSchema =  z.object({
    surName: z.string({
        required_error: "surName is required"
    }).trim().min(1, 'First name is required').max(255, 'First name is too long'),
    givenName: z.string().trim().min(1, 'Last name is required').max(255, 'Last name is too long'),
    nationalId: z.string().trim().min(16, 'National ID must be 16 characters long').max(16, 'National ID must be 16 characters long'),
    email: z.string({
        required_error: "Email address is required"
    }).email('Invalid email format').trim(),
    userId: z.string().trim(),
    phone: z.string().trim().min(10, 'Phone number must be 10 digits long'),
    dateOfBirth: z.date({
        required_error: "Date of birth is required"
    }),
    gender: z.enum(['Male', 'Female', 'Other']), // Use enum for valid gender options
    maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed']), // Use enum for valid marital status options
    numberOfDependencies: z.number({
        required_error: "Number of dependencies is required"
    }).nonnegative('Number of dependencies must be a whole number'),
    workSchool: z.string({
        required_error: "Work school is required"
    }).trim(),
    position: z.string({
        required_error: "Position is required"
    }).trim(),
    monthlySalary: z.number().positive('Monthly salary must be a positive number'),
    amountToPayPerMonth: z.number().positive('Monthly payment must be a positive number'),
    amountRequested: z.number().positive('Amount requested must be a positive number'),
    repaymentPeriod: z.number().positive('Repayment period must be a positive number'),
    bankAccountNumber: z.string({
        required_error: "Bank account number is required"
    }).trim(),
    proofOfEmployment: z.string({
        required_error: "Proof of employment is required"
    }).trim(),
    copyOfNationalId: z.string({
        required_error: "Copy of national ID is required"
    }).trim(),
    createdAt: z.date({
        required_error: "Date of creation is required"
    })
});

// Determining the type of our form data by infering it from the zod schema 
// export type ApplicationFormData = z.infer<typeof formSchema>;
export type ApplicationFormData = UpdateApplicationTypes;

type Props = {
    currentApplication: Application;
    onSave: (ApplicationData: ApplicationFormData) => void;
    isLoading: boolean;
};

const UpdateApplicationForm = ({ onSave, isLoading, currentApplication }: Props) => {
    const form = useForm<ApplicationFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentApplication,
    });

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className='space-y-2 bg-gray-50 rounded-lg p-5 md:p-5'>
            <div className='flex flex-wrap w-full justify-between items-start gap-3'>
                <FormField
                    control={form.control}
                    name='surName'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
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
                    name='givenName'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
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
                    name='email'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} className='bg-white' />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <div className='flex flex-wrap w-full justify-between items-start gap-3'>
                <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <Input {...field} maxLength={10} minLength={10} className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='nationalId'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>National Id</FormLabel>
                            <FormControl>
                                <Input {...field} maxLength={16} minLength={16} className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='dateOfBirth'
                    render={({ field }) => (
                        <FormItem className='flex flex-col w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Date of birth</FormLabel>
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full md:w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            {...field}
                                            disabled={(date: any) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='flex flex-wrap w-full justify-between items-start gap-3'>
                <FormField
                    control={form.control}
                    name='gender'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    defaultValue={field.value}
                                    className="flex flex-col md:flex-row space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Male" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Male</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Female" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Female</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Other" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Other</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='maritalStatus'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Marital Status</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Single" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Single</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Married" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Married</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Divorced" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Divorced</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Widowed" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Widowed</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='flex flex-wrap w-full justify-between items-start  gap-3'>
                <FormField
                    control={form.control}
                    name='numberOfDependencies'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Number of dependencies</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} className='bg-white' />
                            </FormControl>
                            <FormDescription>
                                The number of family members or other people who depend on your income/salary.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='workSchool'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Work school</FormLabel>
                            <FormControl>
                                <Input {...field} className='bg-white' />
                            </FormControl>
                            <FormDescription>
                                The name of the school you teach at
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='position'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} {...field}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select position or occupation" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="User">User</SelectItem>
                                        <SelectItem value="School Director">School Director</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <FormField
                    control={form.control}
                    name='position'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                                <Input {...field} className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
            </div>

            <div className='flex flex-wrap w-full justify-between items-start gap-3'>
                <FormField
                    control={form.control}
                    name='monthlySalary'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Monthly Salary</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='amountRequested'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Amount requested</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='repaymentReriod'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Repayment Period</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className='flex flex-wrap w-full justify-between items-start gap-3'>
                <FormField
                    control={form.control}
                    name='bankAccountNumber'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Bank account number</FormLabel>
                            <FormControl>
                                <Input {...field} className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='proofOfEmployment'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Proof of employment</FormLabel>
                            <FormControl>
                                <Input
                                    type='file'
                                    accept='.jpg, .jepg, .png, .gif'
                                    onChange={(event) =>
                                        field.onChange(event.target.files ? event.target.files[0] : null)
                                    }
                                    className='bg-white'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='copyOfNationalId'
                    render={({ field }) => (
                        <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                            <FormLabel>Copy of national Id</FormLabel>
                            <FormControl>
                                <Input
                                    type='file'
                                    accept='.jpg, .jepg, .png, .gif'
                                    onChange={(event) =>
                                        field.onChange(event.target.files ? event.target.files[0] : null)
                                    }
                                    className='bg-white'
                                />
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

export default UpdateApplicationForm