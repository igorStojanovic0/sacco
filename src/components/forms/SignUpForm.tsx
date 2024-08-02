import { zodResolver } from '@hookform/resolvers/zod';
import { KeyIcon, MailCheckIcon, UserCheck2Icon, UserCircle2Icon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingButton from '../LoadingButton';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
const phoneRegex = /^\+\d{1,3}-\d{3}-\d{6}$/;

const formSchema = z.object({
  surName: z.string().min(2).max(50),
  givenName: z.string().min(2).max(50),
  phone: z.string().optional().refine((val) => val === undefined || val === "" || phoneRegex.test(val), {
    message: "Phone number must include country code and be formatted correctly"
  }),
  email: z.string().email('Invalid email'),
  password: z.string().min(2, 'Too short'),
});

type SignUpFormData = z.infer<typeof formSchema>;

type Props = {
  onSignUp: (values: SignUpFormData) => void;
  isLoading: boolean;
}

const SignUpForm = ({ onSignUp, isLoading }: Props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      surName: '',
      givenName: '',
      email: '',
      password: '',
      phone: '',
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignUp)} className='space-y-2 w-full text-white'>
        <div className='relative'>
          <FormField
            control={form.control}
            name='surName'
            render={({ field }) => (
              <FormItem className='w-full text-black'>
                <FormControl>
                  <Input placeholder="First name" {...field} className="h-14 peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 " />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <UserCheck2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1170b2] peer-focus:text-gray-900" />
        </div>
        <div className='relative'>
          <FormField
            control={form.control}
            name='givenName'
            render={({ field }) => (
              <FormItem className='w-full text-black'>
                <FormControl>
                  <Input placeholder="Last name" {...field} className="h-14 peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 " />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <UserCircle2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1170b2] peer-focus:text-gray-900" />

        </div>

        <div className='relative'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='text-black'>
                <FormControl>
                  <Input placeholder="Email address" {...field} className="h-14 peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 " />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <MailCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1170b2] peer-focus:text-gray-900" />

        </div>
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem hidden>
              <FormControl>
                <Input type='tel' placeholder="+256-000-000000" {...field} hidden />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='relative'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='text-black'>
                <FormControl>
                  <Input type={passwordVisible ? 'text' : 'password'} placeholder="Password" {...field} className="h-14 peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 " />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1170b2] peer-focus:text-gray-900" />

        </div>
        <div className='flex items-center justify-start gap-2 text-white'>
          <Checkbox id='viewpassword' className='' onClick={() => setPasswordVisible(!passwordVisible)} />
          <label htmlFor='viewpassword' className='text-sm'> View password</label>
        </div>

        {isLoading ? <LoadingButton /> : <Button type='submit' className='bg-[#1170b2] hover:bg-gray-600 text-white  md:w-[calc(20vw)] sm:w-[calc(100vw)]'>Submit</Button>}

      </form>
      <div className='mt-5 text-white'>
        {`Already has an account? `}
        <a href={'/auth/SignIn'} className='text-blue-600'>Login</a>
      </div>
    </Form>
  )
}

export default SignUpForm;