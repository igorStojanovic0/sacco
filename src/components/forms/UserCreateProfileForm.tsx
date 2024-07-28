"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
// import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft, FlagIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-tailwindcss-select';
import Datepicker from "tailwind-datepicker-react";
import { z } from 'zod';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem, } from '../ui/radio-group';

const phoneRegex = /^\+\d{1,3}-\d{3}-\d{6}$/;

// Defining the form schema using Zod
const formSchema = z.object({
    title: z.string().optional(),
    surName: z.string().min(2, "Surname is required"),
    givenName: z.string().min(2, "Given Name is required"),
    otherNames: z.string().optional(),
    photograph: z.string().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).default('Male'),
    tribe: z.string().min(2, "Tribe is required"),
    religion: z.string().min(2, "Religion is required"),
    placeOfBirth: z.string().min(2, "Place Of Birth is required"),
    currentParish: z.string().min(2, "Your currentParish is required"),
    birthday: z.any(),
    nationalIDNumber: z.string().length(14, "National ID Number must be exactly 14 characters long"),
    nationalIDPhoto: z.string().optional(),
    phone: z.string().optional().refine((val) => val === undefined || val === "" || phoneRegex.test(val), {
        message: "Phone number must include country code and be formatted correctly"
    }),
    email: z.string().email("Invalid email address"),
    homeAddress: z.string().min(2, "Current Home Address is required"),
    homeLocation: z.string().min(2, "Home Location on is required"),
    districtOfBirth: z.string().min(2, "District of Birth is required"),
    birthParish: z.string().min(2, "Parish is required"),
    birthVillage: z.string().min(2, "Village is required"),
    birthHome: z.string().min(2, "Home address is required"),
    maritalStatus: z.string().optional(),
    profession: z.string().min(2, "Profession is required"),
    jobTitle: z.string().min(2, "Job Title/Description  is required"),
    nextOfKin: z.object({
        nationalID: z.string().length(14, "National ID Number must be exactly 14 characters long"),
        contactName: z.string().min(2, "Contact Name is required"),
        contactPhone: z.string().optional().refine((val) => val === undefined || val === "" || phoneRegex.test(val), {
            message: "Phone number must include country code and be formatted correctly"
        }),
        contactEmail: z.string().optional().refine((val) => val === undefined || val === "" || z.string().email().safeParse(val).success, {
            message: "Invalid email address"
        }),
    }).optional(),
    monthlyIncome: z.string().optional(),
    bankName: z.string().optional(),
    accountNumber: z.string().min(8).max(17).optional(),
    registeredMobileAccount: z.string().optional(),
    registeredEmailWithBank: z.string().optional().refine((val) => val === undefined || val === "" || z.string().email().safeParse(val).success, {
        message: "Invalid email address"
    }),
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
    currentUser: UserFormData;
    onSave: (UserProfileData: UserFormData) => void;
    isLoading: boolean;
    step: number;
    setStep: (step: number) => void;
    subStep: number;
    setSubStep: (subStep: number) => void;
    progress: number;
    setProgress: (progress: number) => void;
};

interface SelectValue {
    value: string;
    label: string;
}

const UserCreateProfileForm = ({ onSave, isLoading, currentUser, step, setStep, progress, setProgress, subStep, setSubStep }: Props) => {

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
    const [twoFactorState, setTwofactorState] = useState<string>(currentUser?.twoFactorAuth)
    const [nationalIDNum, setNationalIDNum] = useState<string>(currentUser?.nationalIDNumber)

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
            <form onSubmit={form.handleSubmit(onSubmit)} className=' bg-gray-50 md:p-10 h-[calc(92vh-1px)]'>
                <div className='justify-between flex'>
                    {subStep > 1 && (<ArrowLeft
                        onClick={() => {
                            setSubStep(subStep - 1);
                            if (subStep === 13) { setStep(1) }
                            if (subStep === 15) { setStep(2) }
                            if (subStep === 16) { setStep(3) }
                            if (subStep === 19) { setStep(4) }
                        }} />
                    )}
                    <FlagIcon color='white'/>
                    <FlagIcon />
                </div>
                {step === 1 && (
                    <div className='items-center justify-center mt-32 w-full text-center flex'>
                        {subStep === 1 && (
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Title</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='title'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
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
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(4);
                                }}>Next</Button>
                            </div>
                        )}

                        {subStep === 2 && (
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Input Your SurName, GivenName, OtherNames</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='surName'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4 '>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='SurName' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='givenName'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='GivenName' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='otherNames'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='OtherNames' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(8);
                                }}>Next</Button>
                            </div>
                        )}

                        {subStep === 3 && (
                            <div className='flex flex-wrap w-1/2 justify-center gap-10 items-center text-center'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Photograph</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='photograph'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4 ml-72'>
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
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(12);
                                }}>Next</Button>

                            </div>
                        )}
                        {subStep === 4 && (
                            <div className='flex flex-wrap w-1/2 justify-center gap-7'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Gender And Input Your Religion, Place of Birth Parish and so on</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='gender'
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormControl>
                                                <RadioGroup
                                                    defaultValue={field.value}
                                                    onValueChange={field.onChange}
                                                    {...field}
                                                    className="flex flex-col md:flex-row space-y-1 justify-center"
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
                                    name='tribe'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Tribe' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='religion'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Religiion' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='placeOfBirth'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Place of Birth Parish/ Mosque/ Other' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='currentParish'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Your Current Parish/ Mosque / Other' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(16);
                                }}>Next</Button>
                            </div>
                        )}
                        {subStep === 5 && (
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Date of Birth</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='birthday'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
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
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(20);
                                }}>Next</Button>
                            </div>
                        )}
                        {subStep === 6 && (
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your National ID Details</FormLabel>

                                <FormField
                                    control={form.control}
                                    name='nationalIDNumber'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormLabel>National ID Number</FormLabel>
                                            <FormControl>
                                                <Input {...field}
                                                    className='bg-white placeholder:text-gray-500' type='number' placeholder='xxxxxxxxxxxxxx' />
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
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(24);
                                }}>Next</Button>
                            </div>
                        )}
                        {subStep === 7 && (
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Contact Information</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='phone'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='+256-000-000000' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField

                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' readOnly />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(28);
                                }}>Next</Button>
                            </div>
                        )}
                        {subStep === 8 && (
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Address Information</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='homeAddress'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormLabel>Home Address</FormLabel>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Current Home Address details (physical address)' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='homeLocation'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormLabel>Home Location</FormLabel>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Home Location on Google Map' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(32);
                                }}>Next</Button>
                            </div>
                        )}
                        {subStep === 9 && (
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Brith Information</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='districtOfBirth'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='District of Birth' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='birthParish'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Parish' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='birthVillage'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Village' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='birthHome'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Home Address' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(36);
                                }}>Next</Button>
                            </div>
                        )}

                        {subStep === 10 && (
                            <div className='flex flex-wrap w-1/2 justify-center gap-14'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Marital Status</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='maritalStatus'
                                    render={({ field }) => (
                                        <FormItem className=' justify-center'>
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
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(40);
                                }}>Next</Button>
                            </div>
                        )}

                        {subStep === 11 && (
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Occupation</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='profession'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Profession' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='jobTitle'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Job Title/Description' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(44);
                                }}>Next</Button>
                            </div>
                        )}

                        {subStep === 12 && (
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Next of Kin/Beneficiaries</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='nextOfKin.nationalID'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Link to National ID' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='nextOfKin.contactName'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Contact Name' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='nextOfKin.contactPhone'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Contact Phone e.g: +256-000-000000' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='nextOfKin.contactEmail'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Contact Email' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(48); setStep(2);
                                }}>Next</Button>
                            </div>
                        )}

                    </div>
                )}

                {step === 2 && (
                    <div className='items-center justify-center mt-32 w-full text-center flex'>
                        {subStep === 13 && (

                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Monthly Income Levels</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='monthlyIncome'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
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
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(52);
                                }}>Next</Button>
                            </div>
                        )}

                        {subStep === 14 && (
                            <>
                                <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                    <FormLabel className='text-3xl font-bold'>Please Input Your Bank Account Details</FormLabel>
                                    <FormField
                                        control={form.control}
                                        name='bankName'
                                        render={({ field }) => (
                                            <FormItem className='w-3/4'>
                                                <FormControl>
                                                    <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Bank Name' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='accountNumber'
                                        render={({ field }) => (
                                            <FormItem className='w-3/4'>
                                                <FormControl>
                                                    <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Account Number' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='registeredMobileAccount'
                                        render={({ field }) => (
                                            <FormItem className='w-3/4'>
                                                <FormControl>
                                                    <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Registered Mobile Account' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='registeredEmailWithBank'
                                        render={({ field }) => (
                                            <FormItem className='w-3/4'>
                                                <FormControl>
                                                    <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Registered Email with Bank' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                        setSubStep(subStep + 1); setProgress(56); setStep(3);
                                    }}>Next</Button>
                                </div>
                            </>
                        )}

                    </div>
                )}

                {step === 3 && (
                    <div className='items-center justify-center mt-32 w-full text-center flex'>
                        {subStep === 15 && (

                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Highest Level of Education</FormLabel>

                                <FormField
                                    control={form.control}
                                    name='highestEducation'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
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
                                    name='otherEducation'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Other Highest Education (Specify)' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(60); setStep(4)
                                }}>Next</Button>
                            </div>
                        )}
                    </div>
                )}

                {step === 4 && (
                    <div className='items-center justify-center mt-32 w-full text-center flex'>
                        {subStep === 16 && (

                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Employment Status</FormLabel>

                                <FormField
                                    control={form.control}
                                    name='employmentStatus'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
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


                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(70);
                                }}>Next</Button>
                            </div>
                        )}
                        {subStep === 17 && (

                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Current Place of Work Address</FormLabel>

                                <FormField
                                    control={form.control}
                                    name='placeOfWorkAddress'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Current Place of Work Address' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(75);
                                }}>Next</Button>
                            </div>
                        )}
                        {subStep === 18 && (

                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Select Your Employer Details</FormLabel>

                                <FormField
                                    control={form.control}
                                    name='employerDetails.name'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormLabel>Name of Employer</FormLabel>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Name of Employer' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='employerDetails.salary'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input type='number' {...field} className='bg-white placeholder:text-gray-500' placeholder='Current Salary (Gross)' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='employerDetails.sideHustleIncome'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input type='number' {...field} className='bg-white placeholder:text-gray-500' placeholder='Other side hussle income (gross)' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(80); setStep(6);
                                }}>Next</Button>
                            </div>
                        )}

                    </div>
                )}

                {step === 6 && (
                    <div className='items-center justify-center mt-32 w-full text-center flex'>
                        {subStep === 19 && (

                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Set Notifications Preferences</FormLabel>

                                <FormField
                                    control={form.control}
                                    name='notificationPreferences'
                                    render={({ field }) => (
                                        <FormItem className='justify-center'>
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
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(85);
                                }}>Next</Button>
                            </div>
                        )}

                        {subStep === 20 && (
                            <>
                                <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                    <FormLabel className='text-3xl font-bold'>Please Set Your Security Features</FormLabel>

                                    <FormField
                                        control={form.control}
                                        name='twoFactorAuth'
                                        render={({ field }) => (
                                            <FormItem className='w-3/4'>
                                                <FormLabel>Two-factor authentication setup</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        defaultValue={field.value}
                                                        onValueChange={(e) => {
                                                            field.onChange(e)
                                                            setTwofactorState(e)
                                                        }}
                                                        {...field}
                                                        className="flex flex-col md:flex-row space-y-1 justify-center"
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
                                            <FormItem className='w-3/4'>
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
                                            <FormItem className='w-3/4'>
                                                <FormControl>
                                                    <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Answer for account recovery' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                        setSubStep(subStep + 1); setProgress(90);
                                    }}>Next</Button>
                                </div>
                            </>
                        )}
                        {subStep === 21 && (

                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Please Set Notifications Preferences</FormLabel>

                                <FormField

                                    control={form.control}
                                    name='consentAgreements'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Checkbox className='bg-white' />
                                            </FormControl>
                                            <FormLabel className='mx-5'>Are you agree to terms and conditions, privacy policy, and data sharing agreements.</FormLabel>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type='submit' className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setProgress(100);
                                }}>Submit</Button>
                            </div>
                        )}
                    </div>
                )}
                <FormField
                    control={form.control}
                    name='groupMembership.joiningDate'
                    render={({ field }) => (
                        <FormItem className='w-[31%]' hidden>
                            <FormControl>
                                <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='groupMembership.recommender.fullName'
                    render={({ field }) => (
                        <FormItem className='w-[31%]' hidden>
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
                        <FormItem className='w-[31%]' hidden>
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
                        <FormItem className='w-[31%]' hidden>
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
                        <FormItem className='w-[31%]' hidden>
                            <FormControl>
                                <Input {...field} className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='userID'
                    render={({ field }) => (

                        <FormItem className='w-[31%]' hidden>
                            <FormControl>
                                <Input value={getMonthAndDay(currentUser?.createdAt)} readOnly className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default UserCreateProfileForm
