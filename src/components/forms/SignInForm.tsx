import { zodResolver } from '@hookform/resolvers/zod';
import { KeyIcon, User2Icon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingButton from '../LoadingButton';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2, 'Password is required'),
});

type SignInFormData = z.infer<typeof formSchema>;

type Props = {
  onSignIn: (values: SignInFormData) => void;
  isLoading: boolean;
}

const SignInForm = ({ onSignIn, isLoading }: Props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignIn)} className='w-full text-white space-y-5'>

        <div className="relative">
          <FormField

            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='bg-transparent'>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input placeholder="Email address" {...field} className="h-14 peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <User2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1170b2] peer-focus:text-gray-900" />

        </div>
        <div className="relative">
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='bg-transparent'>
                {/* <FormLabel>Password</FormLabel> */}
                <FormControl>
                  <Input type={passwordVisible ? 'text' : 'password'} placeholder="Password" {...field} className="h-14 peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1170b2] peer-focus:text-gray-900" />
        </div>

        <div className='flex items-center justify-start gap-2 my-5'>
          <Checkbox id='viewpassword' className='' onClick={() => setPasswordVisible(!passwordVisible)} />
          <label htmlFor='viewpassword' className='text-sm'> View password</label>
        </div>

        <div className='items-center w-full '>
          {isLoading ? <LoadingButton /> : <Button type='submit' className='bg-[#1170b2] hover:bg-gray-600 text-white w-[380px]'>Submit</Button>}
          <div className='mt-7'>
            {`Don't have an account? `}
            <Link href={'/auth/SignUp'} className='text-blue-600'>Create account</Link>
          </div>
        </div>
        <div className='mt-5'>
          <a href={'/forgotpassword'} className='text-blue-600'>Forgot your password?</a>
        </div>
      </form>

    </Form>
  )
}

export default SignInForm;