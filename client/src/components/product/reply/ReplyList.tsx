import type { Reply } from "@/types/reply";
import { ReplyCard } from "./ReplyCard";

type ReplyListProps = {
	replies: Reply[];
};

export const ReplyList = ({ replies }: ReplyListProps) => {
	return (
		<>
			{replies.map((reply) => (
				<ReplyCard key={reply._id} reply={reply} />
			))}
		</>
	);
};
