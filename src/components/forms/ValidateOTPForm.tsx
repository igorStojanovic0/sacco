import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShieldBanIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import LoadingButton from "../LoadingButton"
import { Input } from "../ui/input"
const formSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

type ValidateOTPFormData = z.infer<typeof formSchema>

type Props = {
  onValidateOTP: (values: ValidateOTPFormData) => void;
  isLoading: boolean;
}

export function ValidateOTPForm({ onValidateOTP, isLoading }: Props) {
  const form = useForm<ValidateOTPFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidateOTP)} className="space-y-2">
        <p className="mb-7 text-[14px]">Please enter the 6 digit security code sent to your email address to proceed.</p>
        <div className='relative'>
          <FormField
            control={form.control}
            name='otp'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input placeholder="Security Code" {...field} className="h-14 peer block w-full rounded-md border border-gray-200 py-[12px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ShieldBanIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1170b2] peer-focus:text-gray-900"/>

        </div>
        {/* <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
                {isLoading ? <LoadingButton /> : <Button type='submit' className='bg-[#1170b2] hover:bg-gray-600 text-white w-[380px]'>Submit</Button>}

      </form>
      {/* <form {...form}>
        <p>Cick on the link to get another code</p>
        <button type="submit">Get new token</button> 
      </form> */}
    </Form>
  )
}
