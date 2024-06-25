import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingButton from '../LoadingButton';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
  role_name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
});

type RoleFormData = z.infer<typeof formSchema>;

type Props = {
  onAddRole: (values: RoleFormData) => void;
  isLoading: boolean;
}



const RoleForm = ({ onAddRole, isLoading }: Props) => {
  const form = useForm<RoleFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role_name: '',
      description: '',
    }
  });



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onAddRole)} className='space-y-2 w-full'>
        <div className='flex w-full flex-wrap justify-between'>
          <FormField
            control={form.control}
            name='role_name'
            render={({ field }) => (
              <FormItem className='w-full md:w-[49%]'>
                <FormLabel>Role Name</FormLabel>
                <FormControl>
                  <Input placeholder="Role Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full md:w-[49%]'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
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

export default RoleForm;