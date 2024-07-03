import { Avatar, AvatarImage } from '@/components/ui/avatar'
import type { ReplyType } from '@/types/reply'

type ReplyCardProps = {
  reply: ReplyType
}

export const ReplyCard = ({ reply }: ReplyCardProps) => {
  return (
    <div className='ml-6'>
      <div className='flex items-center gap-2'>
        <Avatar>
          <AvatarImage
            src={
              reply.user.profilePicture ||
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
            className='h-10'
          />
        </Avatar>
        <p>{reply.user.username}</p>
      </div>
      <div className='mt-2'>
        <p className='text-sm break-all'>{reply.text}</p>
      </div>
    </div>
  )
}
