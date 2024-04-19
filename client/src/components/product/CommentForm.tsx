import axios from "axios";
import { toast } from 'react-hot-toast';
import user1Pic from "/alex-unsplash.jpg";
import {  
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { VscSend } from "react-icons/vsc";
import { useState } from "react";
import { CommentSchema, commentResolver } from "@/schema/comment";
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

type CommentFormProps = {
  productId: string;
  commentsUpdated: boolean;
  setCommentsUpdated: (commentsUpdated: boolean) => void;
}
 
export const CommentForm = ({ productId, commentsUpdated, setCommentsUpdated }: CommentFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CommentSchema>({
    defaultValues: {
      userId: currentUser?.userId,
      productId: productId,
      text: ''
    },
    resolver: commentResolver,
  });

  const onSubmit: SubmitHandler<CommentSchema> = (data) => {
    setIsLoading(true);

    axios.post(`${import.meta.env.VITE_API_URL}/comments`, data)
      .then(() => {
        toast.success('Successfully put comment!');
        setCommentsUpdated(!commentsUpdated)
      }).catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
        reset();
      })
  }  

  return (
    <div className="flex items-center gap-2 w-80 my-0 mx-auto">
      {currentUser && (
        <>
          <Avatar>
            <AvatarImage src={user1Pic} />
          </Avatar>
          <form onSubmit={handleSubmit(onSubmit)} className="relative w-full">
            <Input
              placeholder="コメントする" 
              type="text" 
              className="rounded-xl border-secondary-gray"
              {...register('text')}  
            />
            {errors.text?.message && (
              <p className="error-message">{errors.text.message}</p>
            )}
            <button
              type='submit'
              className="absolute top-2 right-4 cursor-pointer"
            >
              <VscSend className="text-2xl" />
            </button>
          </form>
        </>
      )}
    </div>
  )
}