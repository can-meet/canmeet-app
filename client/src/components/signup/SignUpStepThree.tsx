import type { UseFormReturn } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { SignUpSchema } from "@/schema/signup";

type SignUpStepThreeProps = {
  form: UseFormReturn<SignUpSchema>;
  onSubmit: SubmitHandler<SignUpSchema>;
  onBack: () => void;
  imagePreview: string;
  setImagePreview: (imagePreview: string) => void;
}

export const SignUpStepThree = ({ form, onSubmit, onBack, imagePreview, setImagePreview }: SignUpStepThreeProps) => {
	form: UseFormReturn<SignUpSchema>;
	onSubmit: SubmitHandler<SignUpSchema>;
	onBack: () => void;
};

export const SignUpStepThree = ({
	form,
	onSubmit,
	onBack,
}: SignUpStepThreeProps) => {
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
							<div>{form.watch("email")}</div>

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
          name="username"
          render={() => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <span className="text-red-500 mr-2">*</span>
              <div>
                {form.watch("username")}
              </div>
              <FormMessage className="w-[300px] text-xs"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profilePicture"
          render={() => (
            <FormItem>
              <FormLabel>画像</FormLabel>
              <div className="flex flex-col items-center">
                <Avatar className="rounded-full h-32 w-32 object-cover cursor-pointer self-center">
                  <AvatarImage src={imagePreview || "./alex-unsplash.jpg"}/>
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