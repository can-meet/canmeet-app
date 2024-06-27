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
    <div className='mt-4 flex flex-col gap-4'>
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
