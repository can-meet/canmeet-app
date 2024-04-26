import { type ReplySchema, replyResolver } from "@/schema/reply";
import axios from "axios";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import type { RootState } from "@/redux/store";
import { VscSend } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Input } from "../ui/input";

type ReplyFormProps = {
	commentId: string;
};

export const ReplyForm = ({ commentId }: ReplyFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { currentUser } = useSelector((state: RootState) => state.user);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ReplySchema>({
		defaultValues: {
			userId: currentUser?.userId,
			commentId: commentId,
			text: "",
		},
		resolver: replyResolver,
	});

	const onSubmit: SubmitHandler<ReplySchema> = (data) => {
		setIsLoading(true);

		axios
			.post(`${import.meta.env.VITE_API_URL}/replies`, data)
			.then(() => {
				toast.success("Successfully put comment!");
			})
			.catch(() => {
				toast.error("Something went wrong.");
			})
			.finally(() => {
				setIsLoading(false);
				reset();
			});
	};

	return (
		<div className="flex items-center gap-2 w-80 my-1 mx-auto">
			{currentUser && (
				<>
					<form onSubmit={handleSubmit(onSubmit)} className="relative w-full">
						<Input
							placeholder="返信する"
							type="text"
							className="rounded-xl border-secondary-gray px-4"
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
