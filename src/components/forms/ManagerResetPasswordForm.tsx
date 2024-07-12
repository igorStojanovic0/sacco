import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import LoadingButton from '../LoadingButton';

const formSchema = z.object({
  password: z.string().min(2, 'Invalid password')
});

export type ResetPasswordFormData = z.infer<typeof formSchema>;

type Props = {
  onResetPassword: (values: ResetPasswordFormData) => void;
  isLoading: boolean;
}

const ManagerResetPasswordForm = ({ onResetPassword, isLoading }: Props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onResetPassword)} className='space-y-2 w-full'>
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


        {isLoading ? <LoadingButton /> : <Button type='submit' className='bg-[rgb(50,86,166)]'>Submit</Button>}
      </form>
      <div className='mt-5'>
        <a href={'/manager/auth'} className='text-blue-600'>Go back to home</a>
      </div>
    </Form>
  )
}

export default ManagerResetPasswordForm;