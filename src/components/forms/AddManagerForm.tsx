import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import LoadingButton from '../LoadingButton';
import { generateRandomPassword } from '@/utils/generateRandomPassword';

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



const AddManagerForm = ({ onSignUp, isLoading }: Props) => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: generateRandomPassword(),
      phone: '',
      role: 'Manager'
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
        <div className='flex w-full flex-wrap justify-between'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem  className='w-full md:w-[49%]'>
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
              <FormItem className='w-full md:w-[49%]'>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input type='tel' placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
      </form>
    </Form>
  )
}

export default AddManagerForm;