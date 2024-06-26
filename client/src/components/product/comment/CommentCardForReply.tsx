import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { CommentType } from "@/types/comment"
import { ReplyType } from "@/types/reply"
import { ReplyList } from "../reply/ReplyList"
import { useEffect, useState } from "react"
import axios from "axios"

type CommentCardForReplyProps = {
	comment: CommentType
  replySelected: boolean
  repliesUpdated: boolean
};

export const CommentCardForReply = ({ 
	comment, 
	replySelected, 
	repliesUpdated
}: CommentCardForReplyProps) => {
  const [replies, setReplies] = useState<ReplyType[]>([])
	const commentId = comment?._id

  useEffect(() => {
    const getReplies = async () => {
      try {
        if (commentId) {
          await axios
            .get(`${import.meta.env.VITE_API_URL}/replies/${commentId}`)
            .then(res => {
              setReplies(res.data)
            })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getReplies()
  }, [repliesUpdated, commentId])

  return (
    <div
      className={`absolute top-0 bottom-0 w-full overflow-hidden bg-white transform ${replySelected ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500`}
    >
      <div className='overflow-y-auto bg-white h-full z-20'>
        <div className='w-80 my-4 mx-auto'>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage
                src={
                  comment.user.profilePicture ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                }
                className='h-10'
              />
            </Avatar>
            <p className='text-sm font-medium'>{comment.user.username}</p>
          </div>
          <p className='text-sm mt-2 mb-4'>{comment.text}</p>
          <ReplyList replies={replies} />
        </div>
      </div>
    </div>
  )
}
