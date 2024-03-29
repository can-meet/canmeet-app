import { UseFormReturn } from 'react-hook-form';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { SignUpSchema } from '@/schema/signup';
import { useRef } from 'react';
import { Label } from '../ui/label';


type SignUpStepTwoProps = {
  form: UseFormReturn<SignUpSchema>;
  onNext: () => void;
  onBack: () => void;
}

export const SignUpStepTwo = ({ form, onNext, onBack }: SignUpStepTwoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];
    const fileURL = window.URL.createObjectURL(fileObject)

    form.setValue('profilePicture', fileURL);
  };

  return (
    <Form {...form}>
      <form className="space-y-8">

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <span className="text-red-500 ">*</span>
              <FormControl>
                <Input 
                  placeholder="矢野 太郎"
                  className="w-[300px] h-[30px]"
                  {...field} 
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="">
          <Label>画像</Label>
          <div className='flex flex-col items-center gap-4'>

            <Avatar className="rounded-full h-32 w-32 object-cover cursor-pointer self-center">
              <AvatarImage src={form.watch("profilePicture") || "./alex-unsplash.jpg"}/>
              <AvatarFallback>PROFILE</AvatarFallback>
            </Avatar>

            <Input 
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="w-[150px] h-[30px] mt-0 hidden"
              onChange={handleFileChange}
            />

            <Button
              id="file-upload-button"
              type='button'
              className="w-[150px] h-[30px] bg-stone-300 text-black font-normal focus:bg-stone-300 hover:bg-stone-400"
              onClick={handleImageClick}
            >
              画像をアップロード
            </Button>
                  
          </div>
          
        </div>

        
        <div className="flex flex-col items-center gap-2">
          <Button 
            type="button"
            className="w-[300px] h-[30px] bg-blue-500 hover:bg-blue-600"
            onClick={() => onNext()}
          >
            次へ
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