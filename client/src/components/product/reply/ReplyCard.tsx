import { Avatar, AvatarImage } from '@/components/ui/avatar'
import type { Reply } from '@/types/reply'

type ReplyCardProps = {
  reply: Reply
}

export const ReplyCard = ({ reply }: ReplyCardProps) => {
  return (
    <div className='ml-6'>
      <div className='flex items-center gap-2'>
        <Avatar>
          <AvatarImage src={reply.user.profilePicture} />
        </Avatar>
        <p>{reply.user.username}</p>
      </div>
      <div className='mt-2'>
        <p className='text-sm'>{reply.text}</p>
      </div>
    </div>
  )
}
