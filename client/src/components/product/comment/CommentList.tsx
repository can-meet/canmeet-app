import type { CommentType } from '@/types/comment'
import { CommentCard } from './CommentCard'

type CommentListProps = {
  comments: CommentType[]
  toggleReplyForComment: (id: string) => void
}

export const CommentList = ({
  comments,
  toggleReplyForComment,
}: CommentListProps) => {
  return (
    <div className='flex-1 overflow-y-auto mt-4 space-y-4'>
      {comments.map(comment => (
        <CommentCard
          key={comment._id}
          comment={comment}
          toggleReplyForComment={toggleReplyForComment}
        />
      ))}
    </div>
  )
}
