import { Comment } from "@/types/comment";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ProductCommentReplyList } from './ProductCommentReplyList';
import { Loading } from '../layout/Loading';

type ProductCommentCardProps = {
  comment: Comment;
}

export const ProductCommentCard = ({ comment }: ProductCommentCardProps) => {
  return (
    <div className="w-80 my-2 mx-auto">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={comment.user.profilePicture} className="h-10" />
        </Avatar>
        <p>{comment.user.username}</p>
      </div>
      <div className="mt-2">
        <p>{comment.text}</p>
        <div className="flex">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="text-xs">{comment.replies.length}件の返信を表示</span>
              </AccordionTrigger>
              <AccordionContent>
                <ProductCommentReplyList commentId={comment._id}/>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
