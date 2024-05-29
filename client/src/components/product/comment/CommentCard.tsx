import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { Comment } from "@/types/comment";
import { ReplyButton } from "../reply/ReplyButton";
import { ReplyList } from "../reply/ReplyList";

type CommentCardProps = {
	comment: Comment;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
	return (
		<div className="w-80 my-2 mx-auto">
			<div className="flex items-center gap-2">
				<Avatar>
					<AvatarImage src={comment.user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}  className="h-10" />
				</Avatar>
				<p className="text-sm font-medium">{comment.user.username}</p>
			</div>
			<div className="mt-2">
				<p className="text-xs font-medium">{comment.text}</p>
				<ReplyButton commentId={comment._id} />
				<Separator />
				<div className="flex">
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1">
							{comment.replies.length > 0 && (
								<AccordionTrigger className="text-dark-gray">
									<span className="text-xs text-dark-gray flex justify-center gap-2">
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
