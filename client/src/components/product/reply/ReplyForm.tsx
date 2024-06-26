import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { type ReplySchema, replyResolver } from "@/schema/reply"
import { useAuthStore } from "@/store/authStore"
import axios from "axios"
import { useEffect } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { VscSend } from "react-icons/vsc"


type ReplyFormProps = {
  replySelected: boolean
  selectedCommentId: string
  repliesUpdated: boolean
  setRepliesUpdated: (repliesUpdated: boolean) => void
}

export const ReplyForm = ({
  replySelected,
  selectedCommentId,
  repliesUpdated,
  setRepliesUpdated,
}: ReplyFormProps) => {
	const { currentUser } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ReplySchema>({
    defaultValues: {
      userId: currentUser?._id,
      commentId: selectedCommentId,
      text: '',
    },
    resolver: replyResolver,
  })

  // useFormのdefaultValuesにselectedCommentIdをセット
  useEffect(() => {
    setValue('commentId', selectedCommentId)
  }, [selectedCommentId, setValue])

  const onSubmit: SubmitHandler<ReplySchema> = async data => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/replies`, data) // リプライを投稿
      toast.success('Successfully put reply for comment!')
      setRepliesUpdated(!repliesUpdated) // リプライが投稿されたら更新
    } catch (error) {
      toast.error('Something went wrong.')
    } finally {
      reset()
    }
  }

  return (
    <div
      className={`py-4 absolute bottom-0 left-0 w-full bg-white transform ${replySelected ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500`}
    >
      <div className='flex items-center gap-2 w-80 my-0 mx-auto'>
        {currentUser && (
          <>
            <Avatar>
              <AvatarImage
                src={
                  currentUser.profilePicture ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                }
              />
            </Avatar>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='relative max-w-96 mx-auto'
            >
              <Input
                placeholder='返信する'
                type='text'
                className='rounded-xl'
                {...register('text')}
              />
              {errors.text?.message && (
                <p className='error-message'>{errors.text.message}</p>
              )}
              <button
                type='submit'
                className='absolute top-2 right-4 cursor-pointer'
              >
                <VscSend className='text-2xl' />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
