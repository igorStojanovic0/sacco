import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { useState } from 'react';
import LoadingButton from '../LoadingButton';

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  phone: z.string().min(10).max(10),
  email: z.string().email('Invalid email'),
  password: z.string().min(2, 'Too short'),
  role: z.string()
});

type SignUpFormData = z.infer<typeof formSchema>;

type Props = {
  onSignUp: (values: SignUpFormData) => void;
  isLoading: boolean;
}

const AdminSignUpForm = ({ onSignUp, isLoading }: Props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      role: 'Admin'
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignUp)} className='space-y-2 w-full'>
        <div className='flex w-full flex-wrap justify-between'>
          <FormField 
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='w-full md:w-[49%]'>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem className='w-full md:w-[49%]'>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input type='tel' placeholder="Your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
              <Input type={passwordVisible ? 'text' : 'password'} placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-start gap-2'>
          <Checkbox id='viewpassword' className='' onClick={() => setPasswordVisible(!passwordVisible)} />
          <label htmlFor='viewpassword' className='text-sm'> View password</label>
        </div>

        {isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
      </form>
      <div className='mt-5'>
        {`Already has an account? `} 
        <a href={'/admin/auth/signin'} className='text-blue-600'>Login</a>
      </div>
    </Form>
  )
}

export default AdminSignUpForm;