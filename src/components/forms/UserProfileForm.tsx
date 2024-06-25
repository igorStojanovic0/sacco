"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
// import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import Select from 'react-tailwindcss-select';
import { z } from 'zod';
import LoadingButton from '../LoadingButton';
// import { Checkbox } from '../ui/checkbox';
// import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

// Defining the form schema using Zod
const formSchema = z.object({
    title: z.string().optional(),
    surName: z.string().min(1, "Surname is required"),
    givenName: z.string().min(1, "Given Name is required"),
    otherNames: z.string().optional(),
    photograph: z.any().optional(),
    gender: z.string().optional(),
    tribe: z.string().optional(),
    religion: z.string().optional(),
    placeOfBirth: z.string().optional(),
    currentParish: z.string().optional(),
    birthday: z.string().min(1, "Date of Birth is required"),
    nationalIDNumber: z.string().length(14, "National ID Number must be exactly 14 characters long"),
    nationalIDPhoto: z.any().optional(),
    phone: z.string().min(10, "Phone number is required"),
    email: z.string().email("Invalid email address"),
    homeAddress: z.string().optional(),
    homeLocation: z.string().optional(),
    districtOfBirth: z.string().optional(),
    birthParish: z.string().optional(),
    birthVillage: z.string().optional(),
    birthHome: z.string().optional(),
    maritalStatus: z.string().optional(),
    profession: z.string().optional(),
    jobTitle: z.string().optional(),
    nextOfKin: z.object({
        nationalID: z.string().optional(),
        contactName: z.string().optional(),
        contactPhone: z.string().optional(),
        contactEmail: z.string().optional()
    }).optional(),
    monthlyIncome: z.string().optional(),
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    registeredMobileAccount: z.string().optional(),
    registeredEmailWithBank: z.string().optional(),
    highestEducation: z.string().optional(),
    employmentStatus: z.string().optional(),
    placeOfWorkAddress: z.string().optional(),
    employerDetails: z.object({
        name: z.string().optional(),
        salary: z.string().optional(),
        sideHustleIncome: z.string().optional()
    }).optional(),
    groupMembership: z.object({
        joiningDate: z.string().optional(),
        recommender: z.object({
            fullName: z.string().optional(),
            nationalID: z.string().optional(),
            email: z.string().optional(),
            phone: z.string().optional()
        }).optional()
    }).optional(),
    userID: z.string().optional(),
    notificationPreferences: z.string().optional(),
    twoFactorAuth: z.boolean().optional(),
    securityQuestions: z.object({
        question1: z.string().optional(),
        answer1: z.string().optional(),
        question2: z.string().optional(),
        answer2: z.string().optional()
    }).optional(),
    consentAgreements: z.boolean().optional(),
    customFields: z.any().optional(),
    createdAt: z.any()
});


// Infer the form data type from the schema
type UserFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: UserFormData;
    onSave: (UserProfileData: UserFormData) => void;
    isLoading: boolean;
};

interface SelectValue {
    value: string;
    label: string;
}

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    });

    useEffect(() => {
        form.reset(currentUser);
        console.log("currentUser?.nationalIDNumber", currentUser)
    }, [currentUser, form])


    const [title, setTitle] = useState<SelectValue | null>({
        value: "Mr.",
        label: "Mr."
    });

    const [monthlyIncome, setMonthlyIncome] = useState<SelectValue | null>({
        value: "Less than UGX 1,000,000",
        label: "Less than UGX 1,000,000"
    });

    const [highestEducation, setHighestEducation] = useState<SelectValue | null>({
        value: "Secondary (Ordinary Level)",
        label: "Secondary (Ordinary Level)"
    });

    const [employmentStatus, setEmploymentStatus] = useState<SelectValue | null>({
        value: "Employed",
        label: "Employed"
    });


    const getMonthAndDay = (dateString: any) => {
        var txt = ''
        const date = new Date(dateString);
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        const currentYear = new Date().getFullYear();
        const lastTwoDigits = currentYear % 100;
        // UserFormData


        // console.log('nationalIDnumber', currentUser?.nationalIDNumber)

        // if (currentUser?.nationalIDNumber !== undefined) {
        //     txt = `${month}${day}${currentUser.nationalIDNumber}${lastTwoDigits}`
        // } else {
        //     txt = `${month}${day}00000000000000${lastTwoDigits}`
        // }
        return txt
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className='space-y-2 bg-gray-50 rounded-lg md:p-10'>
                <FormDescription>
                    View and change your profile information here
                </FormDescription>

                <div className='flex flex-wrap w-full justify-between items-start gap-3'>
                    {/* <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    
                                    <Select
                                        value={title}
                                        onChange={(e) => setTitle(e as SelectValue)}
                                        options={
                                            [
                                                { value: "Mr.", label: "Mr." },
                                                { value: "Ms.", label: "Ms." },
                                                { value: "Mrs.", label: "Mrs." },
                                                { value: "Dr.", label: "Dr." },
                                                { value: "Prof.", label: "Prof." },
                                                { value: "Other", label: "Other" },
                                            ]
                                        }
                                        primaryColor="blue"
                                    />

                                </FormControl>
                            </FormItem>
                        )}
                    /> */}
                    <FormField
                        control={form.control}
                        name='surName'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Surname</FormLabel>
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
                            <FormItem className='w-[31%]'>
                                <FormLabel>Given Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* <div className='flex flex-wrap w-full justify-between items-start gap-3'>

                    <FormField
                        control={form.control}
                        name='otherNames'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Other Names</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='birthday'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' placeholder="DD/MM/YYYY" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='photograph'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Photograph</FormLabel>
                                <FormControl>
                                    <Input type="file" {...field} className='bg-white' />
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
                                        className="flex flex-col md:flex-row space-y-1"
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
                <div className='flex flex-wrap w-full justify-between items-start gap-3'>

                    <FormField
                        control={form.control}
                        name='tribe'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Tribe</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='religion'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Religion</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='placeOfBirth'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Place of Birth Parish/ Mosque/ Other</FormLabel>
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
                        name='currentParish'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Current Parish/ Mosque/ Other</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <FormField
                        control={form.control}
                        name='nationalIDNumber'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>National ID Number</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' type='number' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='nationalIDPhoto'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>National ID Photo</FormLabel>
                                <FormControl>
                                    <Input type="file" {...field} className='bg-white' />
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
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        disabled
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='homeAddress'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Home Address</FormLabel>
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
                        name='homeLocation'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Home Location</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='districtOfBirth'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>District of Birth</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='birthParish'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Birth Parish</FormLabel>
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
                        name='birthVillage'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Birth Village</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='birthHome'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Birth Home Address</FormLabel>
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
                        name='profession'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Profession</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='jobTitle'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Job Title</FormLabel>
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
                        name='nextOfKin.nationalID'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Next of Kin National ID</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='nextOfKin.contactName'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Next of Kin Contact Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='nextOfKin.contactPhone'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Next of Kin Contact Phone</FormLabel>
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
                        name='nextOfKin.contactEmail'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Next of Kin Contact Email</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='monthlyIncome'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Monthly Income</FormLabel>
                                <FormControl>
                                    <Select
                                        value={monthlyIncome}
                                        onChange={(e) => setMonthlyIncome(e as SelectValue)}
                                        options={
                                            [
                                                { value: "Less than UGX 1,000,000", label: "Less than UGX 1,000,000" },
                                                { value: "UGX 1,000,000 - 5,000,000", label: "UGX 1,000,000 - 5,000,000" },
                                                { value: "UGX 5,000,000 - 15,000,000", label: "UGX 5,000,000 - 15,000,000" },
                                                { value: "Above UGX 15,000,000", label: "Above UGX 15,000,000" },
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
                        name='bankName'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Bank Name</FormLabel>
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
                        name='accountNumber'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Account Number</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='registeredMobileAccount'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Registered Mobile Account</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='registeredEmailWithBank'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Registered Email with Bank</FormLabel>
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
                        name='highestEducation'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Highest Education</FormLabel>
                                <FormControl>
                                    <Select
                                        value={highestEducation}
                                        onChange={(e) => setHighestEducation(e as SelectValue)}
                                        options={
                                            [
                                                { value: "Secondary (Ordinary Level)", label: "Secondary (Ordinary Level)" },
                                                { value: "Secondary (Advanced Level)", label: "Secondary (Advanced Level)" },
                                                { value: "Tertiary", label: "Tertiary" },
                                                { value: "University", label: "University" },
                                                { value: "Other", label: "Other" },
                                            ]
                                        }
                                        primaryColor="blue"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        disabled={highestEducation?.value === "Other" ? false : true}
                        control={form.control}
                        name='highestEducation'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Other (Specify)</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='employmentStatus'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Employment Status</FormLabel>
                                <FormControl>
                                    <Select
                                        value={employmentStatus}
                                        onChange={(e) => setEmploymentStatus(e as SelectValue)}
                                        options={
                                            [
                                                { value: "Employed", label: "Employed" },
                                                { value: "Self-employed", label: "Self-employed" },
                                                { value: "Unemployed", label: "Unemployed" },
                                                { value: "Retired ", label: "Retired " },
                                            ]
                                        }
                                        primaryColor="blue"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                </div>
                <div className='flex flex-wrap w-full justify-between items-start gap-3'>
                    <FormField
                        control={form.control}
                        name='placeOfWorkAddress'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Current Place of Work Address </FormLabel>
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
                        name='employerDetails.name'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Name of Employer</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='employerDetails.salary'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Current Salary (Gross)</FormLabel>
                                <FormControl>
                                    <Input type='number' {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='employerDetails.sideHustleIncome'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Other side hussle income (gross)</FormLabel>
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
                        name='groupMembership.joiningDate'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Date of Joining Group</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='groupMembership.recommender.fullName'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Recommender Full Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='groupMembership.recommender.nationalID'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Recommender National ID</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='groupMembership.recommender.email'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Recommender Email</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='groupMembership.recommender.phone'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Recommender Phone Contacts</FormLabel>
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
                        name='userID'
                        render={({ field }) => (

                            <FormItem className='w-[31%]'>
                                <FormLabel>User Unique ID</FormLabel>
                                <FormControl>
                                    <Input value={getMonthAndDay(currentUser?.createdAt)} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-wrap w-full justify-between items-start gap-3'>

                    <FormField
                        control={form.control}
                        name='notificationPreferences'
                        render={({ field }) => (
                            <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                                <FormLabel>Notifications Preferences
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        defaultValue={field.value}
                                        className="flex flex-col md:flex-row space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="subscribe" />
                                            </FormControl>
                                            <FormLabel className="font-normal">subscribe</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="unsubscribe" />
                                            </FormControl>
                                            <FormLabel className="font-normal">unsubscribe</FormLabel>
                                        </FormItem>
                                        
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                
                <div className='flex flex-wrap w-full justify-between items-start gap-3'>
                    <FormField
                        control={form.control}
                        name='customFields'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Custom Fields</FormLabel>
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
                        name='consentAgreements'
                        render={({ field }) => (
                            <FormItem className='w-[90%]'>
                                <FormControl>
                                    <Checkbox className='bg-white' />
                                </FormControl>
                                <FormLabel>Are you agree to terms and conditions, privacy policy, and data sharing agreements.</FormLabel>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div> */}

                {isLoading ? <LoadingButton /> : <Button type='submit' className='bg-orange-500'>Submit</Button>}

            </form>
        </Form>
    )
}

export default UserProfileForm
