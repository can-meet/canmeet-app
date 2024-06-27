import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import type { CommentType } from '@/types/comment'
import type { ReplyType } from '@/types/reply'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ReplyButton } from '../reply/ReplyButton'
import { ReplyList } from '../reply/ReplyList'

type CommentCardProps = {
  toggleReplyForComment: (id: string) => void
  comment: CommentType
}

export const CommentCard = ({
  toggleReplyForComment,
  comment,
}: CommentCardProps) => {
  const [replies, setReplies] = useState<ReplyType[]>([])
  const commentId = comment._id

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
  }, [commentId])

  return (
    <div className='w-80 mx-auto'>
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
      <div className='mt-2'>
        <p className='text-sm'>{comment.text}</p>
        <ReplyButton
          toggleReplyForComment={toggleReplyForComment}
          commentId={comment._id}
        />
        <Separator />
        <div className='flex'>
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
              {replies.length > 0 && (
                <AccordionTrigger className='text-dark-gray'>
                  <span className='text-xs text-dark-gray flex justify-center gap-2'>
                    <div className='flex items-center justify-center'>
                      <div className='w-[30px] border-t' />
                    </div>
                    {replies.length}件の返信を表示
                  </span>
                </AccordionTrigger>
              )}
              <AccordionContent>
                <ReplyList replies={replies} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
