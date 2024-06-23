import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import LoadingButton from "../LoadingButton"

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
      <form onSubmit={form.handleSubmit(onValidateOTP)} className="w-2/3 space-y-2">
        <FormField
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
        />
        {isLoading ? <LoadingButton /> : <Button type='submit' className='bg-gray-800 hover:bg-gray-600 text-white'>Submit</Button>}
      </form>
      {/* <form {...form}>
        <p>Cick on the link to get another code</p>
        <button type="submit">Get new token</button> 
      </form> */}
    </Form>
  )
}
