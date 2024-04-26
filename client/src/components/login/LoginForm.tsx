import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { LoginSchema } from "@/schema/login";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";

type LoginFormProps = {
	form: UseFormReturn<LoginSchema>;
	onSubmit: SubmitHandler<LoginSchema>;
};

export const LoginForm = ({ form, onSubmit }: LoginFormProps) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-2">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>メールアドレス</FormLabel>
							<span className="text-red-500">*</span>
							<FormControl>
								<Input
									placeholder="abc@gmail.com"
									className="w-[300px] h-[30px]"
									{...field}
								/>
							</FormControl>

							<FormMessage className="w-[300px] text-xs text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>パスワード</FormLabel>
							<span className="text-red-500 mr-2">*</span>
							<span className="ml-2 text-xs">※8文字以上</span>
							<FormControl>
								<Input
									placeholder="123456"
									className="w-[300px] h-[30px]"
									{...field}
								/>
							</FormControl>

							<FormMessage className="w-[300px] text-xs text-red-500" />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-[300px] h-[30px] bg-red-500 hover:bg-red-600"
				>
					送信
				</Button>
			</form>
		</Form>
	);
};
