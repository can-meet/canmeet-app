import { UseFormReturn } from 'react-hook-form';
import { 
  SubmitHandler, 
} from 'react-hook-form';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignUpValues } from '@/types/signup';


type SignUpStepThreeProps = {
  form: UseFormReturn<SignUpValues>;
  onSubmit: SubmitHandler<SignUpValues>;
  onBack: () => void;
}

export const SignUpStepThree = ({ form, onSubmit, onBack }: SignUpStepThreeProps) => {

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormField
          control={form.control}
          name="email"
          render={() => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <span className="text-red-500 ">*</span>
              <div>
                {form.watch("email")}
              </div>
              
              <FormMessage className="w-[300px] text-xs"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={() => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <span className="text-red-500 mr-2">*</span>
              <span className="ml-2 text-xs">※8文字以上</span>
              <div>
                {form.watch("password")}
              </div>
              <FormMessage className="w-[300px] text-xs"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={() => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <span className="text-red-500 mr-2">*</span>
              <div>
                {form.watch("name")}
              </div>
              <FormMessage className="w-[300px] text-xs"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>画像</FormLabel>
              <div className="flex flex-col items-center">
                <Avatar className="rounded-full h-32 w-32 object-cover cursor-pointer self-center">
                  <AvatarImage src={form.watch("image") || "./alex-unsplash.jpg"}/>
                  <AvatarFallback>PROFILE</AvatarFallback>
                </Avatar>
              </div>
              <FormMessage className="w-[300px] text-xs"/>
            </FormItem>
          )}
        />
        <div className="mt-4 w-[300px] text-center">
        <p className="text-red-500 text-xs">※一度登録したら、プロフィール情報の変更はできません。ご注意ください。</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button 
            type="submit"
            className="w-[300px] h-[30px] bg-red-500 hover:bg-red-600"
          >
            送信
          </Button>
          <Button 
            type="button"
            className="w-[300px] h-[30px] bg-stone-300 text-black hover:bg-stone-400 hover:text-black"
            onClick={() => onBack()}
          >
            戻る
          </Button>
        </div>
      </form>
    </Form>
  )
}