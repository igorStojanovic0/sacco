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
  email: z.string().email(),
  password: z.string().min(2, 'Password is required'),
});

type SignInFormData = z.infer<typeof formSchema>;

type Props = {
  onSignIn: (values: SignInFormData) => void;
  isLoading: boolean;
}

const AdminSignInForm = ({ onSignIn, isLoading }: Props) => {
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
      <form onSubmit={form.handleSubmit(onSignIn)} className='space-y-2 w-full'>
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

        <div className='flex justify-between items-center'>
          {isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
          <div>
            {`Don't have an account? `}
            <a href={'/admin/auth/signup'} className='text-blue-600'>Create account</a>
          </div>
        </div>
        <div className='mt-5'>
          {`Forgot your password? `}
          <a href={'/admin/auth/forgotpassword'} className='text-blue-600'>Recover or reset your password</a>
        </div>
      </form>

    </Form>
  )
}

export default AdminSignInForm;