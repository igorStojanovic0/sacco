import { generateRandomPassword } from '@/utils/generateRandomPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingButton from '../LoadingButton';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
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
      surName: '',
      givenName: '',
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
            name='surName'
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
            name='givenName'
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