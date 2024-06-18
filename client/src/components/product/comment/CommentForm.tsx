import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import type { RootState } from "@/redux/store";
import { type CommentSchema, commentResolver } from "@/schema/comment";
import axios from "axios";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { VscSend } from "react-icons/vsc";
import { useSelector } from "react-redux";

type CommentFormProps = {
	productId: string;
	commentsUpdated: boolean;
	setCommentsUpdated: (commentsUpdated: boolean) => void;
};

export const CommentForm = ({
	productId,
	commentsUpdated,
	setCommentsUpdated,
}: CommentFormProps) => {
	const { currentUser } = useSelector((state: RootState) => state.user);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CommentSchema>({
		defaultValues: {
			userId: currentUser?._id,
			productId: productId,
			text: "",
		},
		resolver: commentResolver,
	});

	const onSubmit: SubmitHandler<CommentSchema> = async (data) => {
		try {
			const response = await axios.post(`${import.meta.env.VITE_API_URL}/comments`, data);  // コメントを投稿
			toast.success('Successfully put comment!');
			setCommentsUpdated(!commentsUpdated);  // コメントが投稿されたら更新
	
			const { _id, user, product } = await response.data;

			await axios.post(`${import.meta.env.VITE_API_URL}/notifications/comments/${_id}`, {  // コメントを投稿した際の通知を投稿
        productId: product,
        userId: user
      })
		} catch (error) {
			toast.error('Something went wrong.');
		} finally {
			reset();
		}
	};

	return (
		<div className="flex items-center gap-2 w-80 py-4 mx-auto">
			{currentUser && (
				<>
					<Avatar>
						<AvatarImage src={currentUser.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
					</Avatar>
					<form onSubmit={handleSubmit(onSubmit)} className="relative max-w-96 mx-auto">
						<Input
							placeholder="コメントする"
							type="text"
							className="rounded-xl"
							{...register("text")}
						/>
						{errors.text?.message && (
							<p className="error-message">{errors.text.message}</p>
						)}
						<button
							type="submit"
							className="absolute top-2 right-4 cursor-pointer"
						>
							<VscSend className="text-2xl" />
						</button>
					</form>
				</>
			)}
		</div>
	);
};
