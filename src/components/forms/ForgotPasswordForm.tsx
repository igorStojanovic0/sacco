import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import LoadingButton from '../LoadingButton';

const formSchema = z.object({
  email: z.string().email()
});

type ForgotPasswordFormData = z.infer<typeof formSchema>;

type Props = {
  onForgotPassword: (values: ForgotPasswordFormData) => void;
  isLoading: boolean;
}

const ForgotPasswordForm = ({ onForgotPassword, isLoading }: Props ) => {
  
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onForgotPassword)} className='space-y-2 w-full md:w-4/5'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provide your email to get a reset password link.</FormLabel>
              <FormControl>
                <Input placeholder="Email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
      </form>
      <div className='mt-5'>
        {`Do you remember your password? `} 
        <a href={'/signin'} className='text-blue-600'>Go back to sign in</a>
      </div>
    </Form>
  )
}

export default ForgotPasswordForm;