"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMyContext } from '@/context/MyContext';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, FlagIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-tailwindcss-select';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem, } from '../ui/radio-group';

// Defining the form schema using Zod
const formSchema = z.object({
    name: z.string().min(1, "This field is required"),
    entranceFee: z.object({
        adults: z.string().min(1, "This field is required"),
        children: z.string().min(1, "This field is required"),
        teens: z.string().min(1, "This field is required"),
        friend: z.string().min(1, "This field is required"),
    }).optional(),

    shares: z.object({
        initialNumber: z.string().min(1, "This field is required"),
        nominalPrice: z.string().min(1, "This field is required"),
        maxInitial: z.string().min(1, "This field is required"),
        // unissuedSharePrice: z.string().min(1, "This field is required"),
        // PostSixShare: z.string().min(1, "This field is required"),
    }).optional(),
    saving: z.object({
        minimumAmount: z.string().min(1, "This field is required"),
        lumpSum: z.string().min(1, "This field is required"),
        // accumulation: z.string().optional(),
        // penalty: z.string().optional(),
    }).optional(),
    notificationStatus: z.string().min(1, "This field is required"),
    loanType: z.string().optional(),
    priorityOfLoan: z.string().optional(),
    traningProgram: z.string().min(1, "This field is required"),
    role: z.object({
        admin: z.string().min(1, "This field is required"),
        treasurer: z.string().min(1, "This field is required"),
        secretary: z.string().min(1, "This field is required")
    }).optional(),
    approval: z.object({
        maker: z.string().min(1, "This field is required"),
        checker: z.string().min(1, "This field is required"),
        approver: z.string().min(1, "This field is required")
    }).optional(),
    created_by: z.string().optional()
});


// Infer the form data type from the schema
type SaccoFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User;
    onSave: (SaccoProfileData: SaccoFormData) => void;
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

const SaccoCreateProfileForm = ({ onSave, isLoading, currentUser, step, setStep, progress, setProgress, subStep, setSubStep }: Props) => {

    const router = useRouter()
    const params = useParams()
    const { setSaccoStep } = useMyContext()
    const form = useForm<SaccoFormData>({
        resolver: zodResolver(formSchema),
        mode: 'onChange'
    });


    const [loanType, setLoanTypes] = useState<SelectValue | null>({
        value: '',
        label: ''
    });

    const [priorityOfLoan, setPriorityOfLoan] = useState<SelectValue | null>({
        value: '',
        label: ''
    });
    
    useEffect(() => {
        form.reset();
    }, [currentUser, form])

    const onSubmit = async (SaccoProfileData: SaccoFormData) => {

        var newData = {
            ...SaccoProfileData,
            loanType: loanType?.value,
            priorityOfLoan: priorityOfLoan?.value,
            created_by: currentUser?._id,
            group_id: params?.groupId
        }

        await onSave(newData)
        router.push(`/${params?.groupId}/Sacco`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='md:p-10 h-screen'>
                <div className='justify-between flex'>
                    {subStep > 1 && (<ArrowLeft
                        onClick={() => {
                            setSubStep(subStep - 1);
                            if (subStep < 4) { setSaccoStep(0) }
                            if (subStep === 15) { setStep(2) }
                            if (subStep === 16) { setStep(3) }
                            if (subStep === 19) { setStep(4) }
                        }} />)}
                    <FlagIcon />
                </div>
                <div className='items-center justify-center mt-32 w-full text-center flex'>

                    {subStep === 1 && (
                        <>
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold w-[950px]'>Please Input Sacco Name</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4 '>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Name' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(8);
                                }}>Next</Button>
                            </div>
                        </>
                    )}
                    {subStep === 2 && (
                        <>
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Entrance Fee Configuration</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='entranceFee.adults'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4 '>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Adults' type='number' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='entranceFee.children'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4 '>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='children' type='number' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='entranceFee.teens'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Teens' type='number' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='entranceFee.friend'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='friend' type='number' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(8);
                                }}>Next</Button>
                            </div>
                        </>
                    )}
                    {subStep === 3 && (
                        <>
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                    <FormLabel className='text-3xl font-bold w-[600px]'>Share Management</FormLabel>
                                
                                <FormField
                                    control={form.control}
                                    name='shares.initialNumber'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Initial number of issued shares' type='number' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='shares.nominalPrice'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Nominal share price' type='number' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='shares.maxInitial'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Maximum initial shares available to Purchase' type='number' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setProgress(8);
                                }}>Next</Button>
                            </div>
                        </>
                    )}
                    {subStep === 4 && (
                        <>
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold w-[830px]'>Savings Requirements</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='saving.minimumAmount'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4 '>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Set monthly minimum savings amount' type='number' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='saving.lumpSum'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Option for lump-sum advance payments of the targeted
annual savings' type='number' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* <FormField
                                        control={form.control}
                                        name='saving.accumulation'
                                        render={({ field }) => (
                                            <FormItem className='w-3/4'>
                                                <FormControl>
                                                    <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Accumulation of outstanding monthly savings in member’s
account' type='number' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='saving.penalty'
                                        render={({ field }) => (
                                            <FormItem className='w-3/4'>
                                                <FormControl>
                                                    <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Penalty for outstanding fees above 60 days' type='number' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setSaccoStep(1);
                                }}>Next</Button>
                            </div>
                        </>
                    )}
                    {subStep === 5 && (
                        <>
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold  w-[600px]'>Loan Products and Services</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='loanType'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4 '>
                                            <FormLabel>Loan Types</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={loanType}
                                                    onChange={(e) => setLoanTypes(e as SelectValue)}
                                                    options={
                                                        [
                                                            { value: "Financing", label: "Financing" },
                                                            { value: "Education Loans", label: "Education Loans" },
                                                            { value: "Emergency Loans", label: "Emergency Loans" },
                                                        ]
                                                    }
                                                    primaryColor="blue"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* <div className='flex space-x-2'>
                                        <FormField
                                            control={form.control}
                                            name='saving.lumpSum'
                                            render={({ field }) => (
                                                <FormItem className='w-72'>
                                                    
                                                    <FormControl>
                                                    <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Set Loan Types' type='number' />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='saving.lumpSum'
                                            render={({ field }) => (
                                                <FormItem className='w-72'>
                                                    <FormControl>
                                                        <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Set interest rates' type='number' />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div> */}
                                <FormField
                                    control={form.control}
                                    name='priorityOfLoan'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormLabel>Enable prioritization of specific loan types</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={priorityOfLoan}
                                                    onChange={(e) => setPriorityOfLoan(e as SelectValue)}
                                                    options={
                                                        [
                                                            { value: "Financing", label: "Financing" },
                                                            { value: "Education Loans", label: "Education Loans" },
                                                            { value: "Emergency Loans", label: "Emergency Loans" },
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
                                    name='traningProgram'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4 '>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Add Training Program'/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1); setSaccoStep(2);
                                }}>Next</Button>
                            </div>
                        </>
                    )}
                    {subStep === 6 && (
                        <>
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold w-[600px]'>Role Assignment</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='role.admin'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4 '>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Admin'/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='role.treasurer'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4 '>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Treasurer'/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='role.secretary'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4 '>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Secretary'/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setSubStep(subStep + 1);
                                }}>Next</Button>
                            </div>
                        </>
                    )}
                    {subStep === 7 && (
                        <>
                            <div className='flex flex-wrap w-1/2 justify-center gap-10'>
                                <FormLabel className='text-3xl font-bold'>Approval Process</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='approval.maker'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4 '>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Maker' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='approval.checker'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Checker' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='approval.approver'
                                    render={({ field }) => (
                                        <FormItem className='w-3/4'>
                                            <FormControl>
                                                <Input {...field} className='bg-white placeholder:text-gray-500' placeholder='Approver' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='notificationStatus'
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel className='text-xl font-bold'>Set notifications and reminders</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    defaultValue={field.value}
                                                    onValueChange={field.onChange}
                                                    {...field}
                                                    className="flex flex-col md:flex-row space-y-1 justify-center"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="Enable" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Enable</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="Disable" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Disable</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type='submit' className='block bg-green-600 text-white w-3/4 hover:bg-green-400' onClick={() => {
                                    setProgress(100);
                                }}>Submit</Button>
                            </div>
                        </>
                    )}
                </div>
            </form>
        </Form>
    )
}

export default SaccoCreateProfileForm
