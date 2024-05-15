import type { UseFormReturn } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

import { SignUpSchema } from '@/schema/signup';
import { useRef } from 'react';
import { Label } from '../ui/label';
import { profileImageUpload } from '@/lib/profileImageUpload';


type SignUpStepTwoProps = {
  form: UseFormReturn<SignUpSchema>;
  onNext: () => void;
  onBack: () => void;
  imagePreview: string;
  setImagePreview: (imagePreview: string) => void;
}


export const SignUpStepTwo = ({ form, onNext, onBack, imagePreview, setImagePreview }: SignUpStepTwoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];
    const fileURL = window.URL.createObjectURL(fileObject)
    setImagePreview(fileURL);

    try {
      const uploadFileURL = await profileImageUpload(fileObject)

      form.setValue('profilePicture', uploadFileURL);
    } catch (error) {
      console.error('Error uploading file:', error);
    }

  };


  return (
    <Form {...form}>
      <p className="text-primary-red text-ms text-center w-72 mb-6">※このページ以降、プロフィール情報の変更はできません。<br />ご注意ください。</p>
      <form className="space-y-8">

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">名前</FormLabel>
              <span className="text-primary-red">*</span>
              <FormControl>
                <Input 
                  // placeholder="矢野 太郎"
                  className=""
                  {...field} 
                />
              </FormControl>
              
              <FormMessage className="w-[300px] text-xs text-red-500"/>
            </FormItem>
          )}
        />

        <div className="">
          <div className='flex flex-col items-center gap-2'>

            <Avatar className="rounded-full h-32 w-32 object-cover cursor-pointer self-center">
              <AvatarImage src={imagePreview || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
              <AvatarFallback>PROFILE</AvatarFallback>
            </Avatar>

            <Input 
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="mt-0 hidden"
              onChange={handleFileChange}
            />

            <Button
              id="file-upload-button"
              type='button'
              className="py-2 bg-button-gray text-xs font-medium w-fit"
              onClick={handleImageClick}
            >
              画像をアップロード
            </Button>
                  
          </div>
          
        </div>

        
        <div className="flex flex-col items-center gap-2">
          <Button 
            type="button"
            variant={"blue"}
            className=""
            onClick={() => onNext()}
          >
            次へ
          </Button>
          <Button 
            type="button"
            className=" bg-stone-300 hover:bg-stone-400 hover:text-black"
            onClick={() => onBack()}
          >
            戻る
          </Button>
        </div>
        
      </form>
    </Form>
  )
}