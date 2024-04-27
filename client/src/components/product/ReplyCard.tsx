import { Avatar, AvatarImage } from "@/components/ui/avatar";
import type { Reply } from "@/types/reply";
import { Loading } from "../layout/Loading";

type ReplyCardProps = {
	reply: Reply;
	loading: boolean;
};

export const ReplyCard = ({ reply, loading }: ReplyCardProps) => {
	if (loading) {
		<Loading />;
	}

	return (
		<div className="ml-5 my-2">
			<div className="flex items-center gap-2">
				<Avatar>
					<AvatarImage src={reply.user.profilePicture} />
				</Avatar>
				<p>{reply.user.username}</p>
			</div>
			<div className="mt-2">
				<p>{reply.text}</p>
			</div>
		</div>
	);
};
