import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { LoginSchema } from '@/schema/login'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'

type LoginFormProps = {
  form: UseFormReturn<LoginSchema>
  onSubmit: SubmitHandler<LoginSchema>
}

export const LoginForm = ({ form, onSubmit }: LoginFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-2'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-normal'>メールアドレス</FormLabel>
              <span className='text-primary-red'>*</span>
              <FormControl>
                <Input
                  type='email'
                  // placeholder="abc@gmail.com"
                  {...field}
                />
              </FormControl>

              <FormMessage className='w-72 text-xs text-primary-red' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-normal'>パスワード</FormLabel>
              <span className='text-primary-red mr-2'>*</span>
              <span className='ml-2 text-xs'>※8文字以上</span>
              <FormControl>
                <Input
                  type='password'
                  // placeholder="123456"
                  {...field}
                />
              </FormControl>

              <FormMessage className='w-[300px] text-xs text-primary-red' />
            </FormItem>
          )}
        />
        <Button type='submit' variant={'red'} className=''>
          送信
        </Button>
      </form>
    </Form>
  )
}
