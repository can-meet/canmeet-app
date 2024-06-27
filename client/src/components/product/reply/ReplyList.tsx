import type { ReplyType } from '@/types/reply'
import { ReplyCard } from './ReplyCard'

type ReplyListProps = {
  replies: ReplyType[]
}

export const ReplyList = ({ replies }: ReplyListProps) => {
  return (
    <div className='flex flex-col gap-2'>
      {replies.map(reply => (
        <ReplyCard key={reply._id} reply={reply} />
      ))}
    </div>
  )
}
