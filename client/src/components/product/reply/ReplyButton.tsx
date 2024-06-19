type ReplyButtonProps = {
	toggleReplyForComment: (id: string) => void;
	commentId: string;
};

export const ReplyButton = ({ toggleReplyForComment, commentId }: ReplyButtonProps) => {
	return (
		<div>
			<button
				type="button"
				className="mt-1.5 text-dark-gray text-xs font-semibold"
				onClick={() => toggleReplyForComment(commentId)}
			>
				返信する
			</button>
		</div>
	);
};
