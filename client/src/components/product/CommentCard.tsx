import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { Comment } from "@/types/comment";
import { ReplyButton } from "./ReplyButton";
import { ReplyList } from "./ReplyList";

type CommentCardProps = {
	comment: Comment;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
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
				<ReplyButton commentId={comment._id} />
				<Separator />
				<div className="flex">
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1">
							{comment.replies.length > 0 && (
								<AccordionTrigger className="text-reply-gray">
									<span className="text-xs text-reply-gray flex justify-center gap-2">
										<div className="flex items-center justify-center">
											<div className="w-[30px] border-t"></div>
										</div>
										{comment.replies.length}件の返信を表示
									</span>
								</AccordionTrigger>
							)}
							<AccordionContent>
								<ReplyList commentId={comment._id} />
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</div>
	);
};
