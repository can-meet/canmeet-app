import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { Comment } from "@/types/comment";
import { ReplyList } from "../reply/ReplyList";
import { useEffect, useState } from "react";
import { Reply } from "@/types/reply";
import axios from "axios";

type CommentCardForReplyProps = {
	comment: Comment;
  replySelected: boolean;
  repliesUpdated: boolean;
};

export const CommentCardForReply = ({ comment, replySelected, repliesUpdated }: CommentCardForReplyProps) => {
  const [replies, setReplies] = useState<Reply[]>([]);
	const commentId = comment._id;

	useEffect(() => {
		const getReplies = async () => {
			try {
				if (commentId) {
					await axios
						.get(`${import.meta.env.VITE_API_URL}/replies/${commentId}`)
						.then((res) => {
							setReplies(res.data);
						});
				}
			} catch (error) {
				console.log(error);
			}
		};
		getReplies();
	}, [repliesUpdated, commentId]);

	return (
    <div className={`absolute max-h-48 top-0 w-full transform ${replySelected ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500`}>
      <div className="w-80 my-4 mx-auto">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={comment.user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}  className="h-10" />
          </Avatar>
          <p className="text-sm font-medium">{comment.user.username}</p>
        </div>
        <div className="mt-2">
          <p className="text-sm">{comment.text}</p>
          <Separator />
          <div className="flex">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                {replies.length > 0 && (
                  <AccordionTrigger className="text-dark-gray">
                    <span className="text-xs text-dark-gray flex justify-center gap-2">
                      <div className="flex items-center justify-center">
                        <div className="w-[30px] border-t"></div>
                      </div>
                      {replies.length}件の返信を表示
                    </span>
                  </AccordionTrigger>
                )}
                <AccordionContent className='overflow-scroll max-h-96 pr-3'>
                  <ReplyList replies={replies} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
	);
};
