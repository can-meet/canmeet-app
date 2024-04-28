import { useState } from "react";
import { ReplyForm } from "./ReplyForm";

type ReplyButtonProps = {
	commentId: string;
};

export const ReplyButton = ({ commentId }: ReplyButtonProps) => {
	const [isReplying, setIsReplying] = useState(false);
	const handleReplyClick = () => {
		setIsReplying(!isReplying);
	};

	return (
		<div>
			<button
				type="button"
				className="mt-2 text-reply-gray text-xs"
				onClick={handleReplyClick}
			>
				{isReplying ? "閉じる" : "返信する"}
			</button>

			{isReplying && <ReplyForm commentId={commentId} />}
		</div>
	);
};
