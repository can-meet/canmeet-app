import type { UseFormReturn } from "react-hook-form";

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
import type { SignUpSchema } from "@/schema/signup";

type SignUpStepOneProps = {
	form: UseFormReturn<SignUpSchema>;
	onNext: () => void;
};

export const SignUpStepOne = ({ form, onNext }: SignUpStepOneProps) => {
	return (
		<Form {...form}>
			<form className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>メールアドレス</FormLabel>
							<span className="text-red-500 ">*</span>
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
					type="button"
					className="w-[300px] h-[30px] bg-blue-500 hover:bg-blue-600"
					onClick={() => onNext()}
				>
					次へ
				</Button>
			</form>
		</Form>
	);
};
