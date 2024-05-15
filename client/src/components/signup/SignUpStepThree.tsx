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
import { SignUpSchema } from '@/schema/signup';


type SignUpStepThreeProps = {
  form: UseFormReturn<SignUpSchema>;
  onSubmit: SubmitHandler<SignUpSchema>;
  onBack: () => void;
  imagePreview: string;
  setImagePreview: (imagePreview: string) => void;
}

export const SignUpStepThree = ({ form, onSubmit, onBack, imagePreview }: SignUpStepThreeProps) => {

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">

        <FormField
          control={form.control}
          name="email"
          render={() => (
            <FormItem>
              <FormLabel className='font-normal'>メールアドレス</FormLabel>
              <span className="text-primary-red">*</span>
              <div>
                {form.watch("email")}
              </div>
              
              <FormMessage className="w-72 text-xs"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={() => (
            <FormItem>
              <FormLabel className='font-normal'>パスワード</FormLabel>
              <span className="text-primary-red mr-2">*</span>
              <div>
                {form.watch("password")}
              </div>
              <FormMessage className="w-72 text-xs"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={() => (
            <FormItem>
              <FormLabel className='font-normal'>名前</FormLabel>
              <span className="text-primary-red mr-2">*</span>
              <div>
                {form.watch("username")}
              </div>
              <FormMessage className="w-72 text-xs"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profilePicture"
          render={() => (
            <FormItem>
              <div className="flex flex-col items-center">
                <Avatar className="rounded-full h-32 w-32 object-cover cursor-pointer self-center">
                  <AvatarImage src={imagePreview || "./alex-unsplash.jpg"}/>
                  <AvatarFallback>PROFILE</AvatarFallback>
                </Avatar>
              </div>
              <FormMessage className="w-72 text-xs"/>
            </FormItem>
          )}
        />
        <div className="mt-4 w-72 text-center">
        <p className="text-primary-red text-ms">※一度登録したら、プロフィール情報の変更はできません。<br/>ご注意ください。</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button 
            type="submit"
            variant={"red"}
            className="font-semibold"
          >
            送信
          </Button>
          <Button 
            type="button"
            className="font-semibold"
            onClick={() => onBack()}
          >
            戻る
          </Button>
        </div>
      </form>
    </Form>
  )
}