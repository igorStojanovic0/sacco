"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
// import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-tailwindcss-select';
import Datepicker from "tailwind-datepicker-react";
import { z } from 'zod';
import LoadingButton from '../LoadingButton';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const phoneRegex = /^\+\d{1,3}-\d{3}-\d{6}$/;

// Defining the form schema using Zod
const formSchema = z.object({
    title: z.string().optional(),
    surName: z.string().min(2, "Surname is required"),
    givenName: z.string().min(2, "Given Name is required"),
    otherNames: z.string().optional(),
    photograph: z.string().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).default('Male'),
    tribe: z.string().optional(),
    religion: z.string().optional(),
    placeOfBirth: z.string().optional(),
    currentParish: z.string().optional(),
    birthday: z.any(),
    nationalIDNumber: z.string().length(14, "National ID Number must be exactly 14 characters long"),
    nationalIDPhoto: z.string().optional(),
    phone: z.string().optional().refine((val) => val === undefined || val === "" || phoneRegex.test(val), {
        message: "Phone number must include country code and be formatted correctly"
    }),
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
        contactEmail:  z.string().optional().refine((val) => val === undefined || val === "" || z.string().email().safeParse(val).success, {
            message: "Invalid email address"
        }),
    }).optional(),
    monthlyIncome: z.string().optional(),
    bankName: z.string().optional(),
    accountNumber: z.string().min(8).max(17).optional(),
    registeredMobileAccount: z.string().optional(),
    registeredEmailWithBank: z.string().optional(),
    highestEducation: z.string().optional(),
    otherEducation: z.string().optional(),
    employmentStatus: z.string().optional(),
    placeOfWorkAddress: z.string().optional(),
    employerDetails: z.object({
        name: z.string().optional(),
        salary: z.string().optional(),
        sideHustleIncome: z.string().optional()
    }).optional(),
    groupMembership: z.object({
        joiningDate: z.any(),
        recommender: z.object({
            fullName: z.string().optional(),
            nationalID: z.string().optional(),
            email: z.string().optional(),
            phone: z.string().optional()
        }).optional()
    }).optional(),
    userID: z.string().optional(),
    notificationPreferences: z.string().optional(),
    twoFactorAuth: z.enum(['Enabled', 'Disabled']).default('Disabled'),
    securityQuestions: z.object({
        question: z.string().optional(),
        answer: z.string().optional(),
    }).optional(),
    consentAgreements: z.boolean().optional(),
    customFields: z.any().optional(),
    createdAt: z.any()
});


// Infer the form data type from the schema
type UserFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User;
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
         mode: 'onChange'
    });

    const [title, setTitle] = useState<SelectValue | null>({
        value: currentUser?.title as string,
        label: currentUser?.title as string
    });

    const [monthlyIncome, setMonthlyIncome] = useState<SelectValue | null>({
        value: currentUser?.monthlyIncome as string,
        label: currentUser?.monthlyIncome as string
    });

    const [highestEducation, setHighestEducation] = useState<SelectValue | null>({
        value: currentUser?.highestEducation as string,
        label: currentUser?.highestEducation as string
    });

    const [employmentStatus, setEmploymentStatus] = useState<SelectValue | null>({
        value: currentUser?.employmentStatus as string,
        label: currentUser?.employmentStatus as string
    });

    const [question, setQuestion] = useState<SelectValue | null>({
        value: currentUser?.securityQuestions?.question as string,
        label: currentUser?.securityQuestions?.question as string
    });

    const [show, setShow] = useState<boolean>(false)
    const [showBirthday, setShowBirthday] = useState<boolean>(false)
    const [avatarFile, setAvatarFile] = useState({ file: null, url: "" });
    const [IDPhoto, setIDPhoto] = useState({ file: null, url: "" });
    const [twoFactorState, setTwofactorState] = useState<string | undefined>(currentUser?.twoFactorAuth)
    const [nationalIDNum, setNationalIDNum] = useState<string | undefined>(currentUser?.nationalIDNumber)

    useEffect(() => {
        form.reset(currentUser);
    }, [currentUser, form])

    const handleClose = (state: boolean) => {
        setShow(state)
    }

    const handleBirthdayClose = (state: boolean) => {
        setShowBirthday(state)
    }

    const handleAvatarFile = (e: any) => {
        if (e.target.files[0]) {
            setAvatarFile({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) });
        } else {
            setAvatarFile({ file: null, url: "" });
        }
    };

    const handleIDFile = (e: any) => {
        if (e.target.files[0]) {
            setIDPhoto({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) });
        } else {
            setIDPhoto({ file: null, url: "" });
        }
    };

    const getMonthAndDay = (dateString: any) => {
        var txt = ''
        const date = new Date(dateString);
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        const currentYear = new Date().getFullYear();
        const lastTwoDigits = currentYear % 100;

        // UserFormData


        if (currentUser?.nationalIDNumber !== undefined || currentUser?.nationalIDNumber !== "") {
            txt = `${month}${day}${currentUser.nationalIDNumber}${lastTwoDigits}`
        } else {

            txt = `${month}${day}${Math.floor(Math.random() * 1e14).toString().padStart(14, '0')}${lastTwoDigits}`
        console.log('nationalIDnumber', txt)

        }
        return txt
    }

    const onSubmit = async (UserProfileData: UserFormData) => {
        const formData = new FormData();
        let avatar = '';
        if (avatarFile.file) {
            formData.append("file", avatarFile.file);
            try {
                const { data: { fileName } } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                avatar = fileName;
                console.log("avatar", avatar);

            }
            catch (e) {
                console.error('File not uploaded', 'Error')
            }
        }

        let newIDphoto = '';
        if (IDPhoto.file) {
            formData.append("file", IDPhoto.file);
            try {
                const { data: { fileName } } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/IDPhoto/`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                newIDphoto = fileName;
                console.log("avatar", avatar);

            }
            catch (e) {
                console.error('File not uploaded', 'Error')
            }
        }

        var newData = {
            ...UserProfileData,
            title: title?.value,
            monthlyIncome: monthlyIncome?.value,
            employmentStatus: employmentStatus?.value,
            highestEducation: highestEducation?.value,
            otherEducation: highestEducation?.value !== "Other" ? "" : UserProfileData.otherEducation,
            photograph: avatar === "" ? (currentUser?.photograph !== "default" ? currentUser?.photograph : "default") : avatar,
            nationalIDPhoto: newIDphoto === "" ? (currentUser?.nationalIDPhoto !== "default" ? currentUser?.nationalIDPhoto : "default") : newIDphoto,
            securityQuestions: { ...UserProfileData?.securityQuestions, question: question?.value }
        }
        console.log("submit", newData?.photograph);
        await onSave(newData)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 bg-gray-50 rounded-lg md:p-10'>
                <FormDescription>
                    View and change your profile information here
                </FormDescription>

                <div className='flex flex-wrap w-full justify-between items-start gap-3'>
                    <FormField
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
                                <FormMessage />

                            </FormItem>
                        )}
                    />
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
                <div className='flex flex-wrap w-full justify-between items-start gap-3'>

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
                                    {/* <Input {...field} className='bg-white' placeholder="DD/MM/YYYY" /> */}
                                    <Datepicker options={{
                                        autoHide: true as boolean,
                                        todayBtn: false as boolean,
                                        clearBtn: true as boolean,
                                        clearBtnText: "Clear" as string,
                                        maxDate: new Date("2030-01-01") as Date,
                                        minDate: new Date("1950-01-01") as Date,
                                        theme: {
                                            background: "bg-white dark:bg-gray-800" as string,
                                            todayBtn: "" as string,
                                            clearBtn: "" as string,
                                            icons: "" as string,
                                            text: "" as string,
                                            disabledText: "" as string,
                                            input: "" as string,
                                            inputIcon: "" as string,
                                            selected: "" as string,
                                        },
                                        datepickerClassNames: "top-50" as string,
                                        defaultDate: new Date(field?.value ? field.value : '1950-01-01') as Date,
                                        language: "en" as string,
                                        disabledDates: [] as any,
                                        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as any,
                                        inputNameProp: "date" as string,
                                        inputIdProp: "date" as string,
                                        inputPlaceholderProp: "Select Date" as string,
                                        inputDateFormatProp: {
                                            day: "numeric" as any,
                                            month: "numeric" as any,
                                            year: "numeric" as any
                                        }
                                    }} onChange={field.onChange} show={showBirthday} setShow={handleBirthdayClose} />
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
                                    <>
                                        <div className='justify-center absolute bg-none flex group items-center h-[10rem] w-[10rem] overflow-y-hidden transition-all cursor-pointer rounded-[50%]'>
                                            <span className='profile_banner_edit_but opacity-[0.0001] w-fit m-auto flex justify-center items-center group-hover:opacity-100 transition-all lg:mt-[-100px] md:mt-[-70px] mt-[-50px] absolute'>
                                                <svg className="h-5 w-5 text-[#ffffff] sm:h-8 sm:w-8" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                            </span>
                                            <input type="file" accept=".png, .jpg, .jpeg" onChange={handleAvatarFile} className="opacity-0 w-full h-full cursor-pointer border rounded-[50%]" />
                                        </div>
                                        <div className='justify-center flex group items-center h-[10rem] w-[10rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] cursor-pointer dark:border-[rgb(18,18,18)] border-[#ffffff] border-[5px] rounded-[50%]'>

                                            {avatarFile.file ?
                                                <span className='w-full h-full flex overflow-y-hidden'>
                                                    <Image className='w-full shadow-lg visible-image' width={100} height={100} src={avatarFile.url} alt="Photograph" />
                                                </span>
                                                : <span className='w-full h-full flex overflow-y-hidden'>
                                                    <Image className='w-full shadow-lg visible-image' width={100} height={100} src={(currentUser?.photograph === 'default' || !currentUser?.photograph) ? '/assets/user.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${field?.value}`} alt="Photograph" />
                                                </span>
                                            }
                                        </div>
                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <div className='flex flex-wrap w-full justify-start items-start gap-14'>

                    <FormField
                        control={form.control}
                        name='gender'
                        render={({ field }) => (
                            <FormItem className='w-full sm:w-[49%] md:w-[31%]'>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                        {...field}
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
                                        onValueChange={field.onChange}
                                        {...field}
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
                                    <Input {...field} 
                                    // onChange={(e: any) => {
                                    //     field.onChange
                                    //     setNationalIDNum(e)
                                    // }} 
                                    className='bg-white' type='number' placeholder='xxxxxxxxxxxxxx'/>
                                </FormControl>
                                <FormMessage className='text-red-600' />
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
                                <>
                                        <div className='justify-center absolute bg-none flex group items-center h-[10rem] w-[10rem] overflow-y-hidden transition-all cursor-pointer rounded-[10%]'>
                                            <span className='profile_banner_edit_but opacity-[0.0001] w-fit m-auto flex justify-center items-center group-hover:opacity-100 transition-all lg:mt-[-100px] md:mt-[-70px] mt-[-50px] absolute'>
                                                <svg className="h-5 w-5 text-[#ffffff] sm:h-8 sm:w-8" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                            </span>
                                            <input type="file" accept=".png, .jpg, .jpeg" onChange={handleIDFile} className="opacity-0 w-full h-full cursor-pointer border rounded-[50%]" />
                                        </div>
                                        <div className='justify-center flex group items-center h-[10rem] w-[10rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] cursor-pointer dark:border-[rgb(18,18,18)] border-[#ffffff] border-[5px] rounded-[10%]'>

                                            {IDPhoto.file ?
                                                <span className='w-full h-full flex overflow-y-hidden'>
                                                    <Image className='w-full shadow-lg visible-image' width={100} height={100} src={IDPhoto.url} alt="ID photo" />
                                                </span>
                                                : <span className='w-full h-full flex overflow-y-hidden'>
                                                    <Image className='w-full shadow-lg visible-image' width={100} height={100} src={(currentUser?.nationalIDPhoto === 'default' || !currentUser?.nationalIDPhoto) ? '/assets/user.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${field?.value}`} alt="ID photo" />
                                                </span>
                                            }
                                        </div>
                                    </>
                                  
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
                                    <Input {...field} className='bg-white' placeholder='+256-000-000000'/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField

                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' readOnly/>
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

                    {/* Add fields for nextOfKin, monthlyIncome, etc., following the same pattern */}

                    {/* Fields for nextOfKin */}
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

                    {/* Additional fields for financial information */}
                    <FormField
                        control={form.control}
                        name='monthlyIncome'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Monthly Income</FormLabel>
                                <FormControl>
                                    {/* <Select onValueChange={field.onChange} {...field}>
                                    </Select> */}
                                    <Select
                                        // onChange={field.onChange} 
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

                    {/* Additional fields for educational information */}
                    <FormField
                        control={form.control}
                        name='highestEducation'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Highest Education</FormLabel>
                                <FormControl>
                                    <Select
                                        // onChange={field.onChange} 
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
                        name='otherEducation'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Other Highest Education (Specify)</FormLabel>
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
                                    {/* <Input {...field} className='bg-white' placeholder="DD/MM/YYYY" /> */}
                                    <Datepicker options={{
                                        autoHide: true as boolean,
                                        todayBtn: false as boolean,
                                        clearBtn: true as boolean,
                                        clearBtnText: "Clear" as string,
                                        maxDate: new Date("2030-01-01") as Date,
                                        minDate: new Date("1950-01-01") as Date,
                                        theme: {
                                            background: "bg-white dark:bg-gray-800" as string,
                                            todayBtn: "" as string,
                                            clearBtn: "" as string,
                                            icons: "" as string,
                                            text: "" as string,
                                            disabledText: "" as string,
                                            input: "" as string,
                                            inputIcon: "" as string,
                                            selected: "" as string,
                                        },
                                        datepickerClassNames: "top-120" as string,
                                        defaultDate: new Date(field?.value ? field.value : '1950-01-01') as Date,
                                        language: "en" as string,
                                        disabledDates: [] as any,
                                        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as any,
                                        inputNameProp: "date" as string,
                                        inputIdProp: "date" as string,
                                        inputPlaceholderProp: "Select Date" as string,
                                        inputDateFormatProp: {
                                            day: "numeric" as any,
                                            month: "long" as any,
                                            year: "numeric" as any
                                        }
                                    }} onChange={field.onChange} show={show} setShow={handleClose}
                                    />
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
                                    <Input {...field}  className='bg-white' />
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
                                    <Input value={getMonthAndDay(currentUser?.createdAt)} readOnly className='bg-white' />
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
                                        onValueChange={field.onChange}
                                        {...field}
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
                        name='twoFactorAuth'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Two-factor authentication setup</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        defaultValue={field.value}
                                        onValueChange={(e) => {
                                            field.onChange(e)
                                            setTwofactorState(e)
                                        }}
                                        {...field}
                                        className="flex flex-col md:flex-row space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Enabled" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Enabled</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Disabled" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Disabled</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        disabled={twoFactorState === "Enabled" ? false : true}
                        control={form.control}
                        name='securityQuestions.question'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>

                                <FormLabel>Security questions for account recovery</FormLabel>
                                <FormControl>
                                    {twoFactorState === "Enabled" ? (
                                        <Select
                                            value={question}
                                            onChange={(e) => setQuestion(e as SelectValue)}
                                            options={
                                                [
                                                    { value: "Your first pet's name", label: "Your first pet's name" },
                                                    { value: "The name of your elementary school", label: "The name of your elementary school" },
                                                    { value: "Your elementary school mascot", label: "Your elementary school mascot" },
                                                    { value: "Your best friend's nickname", label: "Your best friend's nickname" },
                                                    { value: "Your favorite sports team", label: "Your favorite sports team" },
                                                ]
                                            }
                                            primaryColor="blue"
                                        />
                                    ) : (
                                        <><Input disabled /></>
                                    )}


                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        disabled={twoFactorState === "Enabled" ? false : true}
                        control={form.control}
                        name='securityQuestions.answer'
                        render={({ field }) => (
                            <FormItem className='w-[31%]'>
                                <FormLabel>Answer for account recovery</FormLabel>
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
                                <FormLabel className='mx-5'>Are you agree to terms and conditions, privacy policy, and data sharing agreements.</FormLabel>

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

export default UserProfileForm
