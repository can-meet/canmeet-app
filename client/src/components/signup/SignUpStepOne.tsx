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
			<form className="space-y-8 mt-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-normal">メールアドレス</FormLabel>
							<span className="text-primary-red">*</span>
							<FormControl>
								<Input
									// placeholder="abc@gmail.com"
									type="email"
									className="w-button placeholder:text-default-black"
									{...field}
								/>
							</FormControl>
							<FormMessage className="w-button text-xs text-primary-red" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-normal">パスワード</FormLabel>
							<span className="text-primary-red mr-2">*</span>
							<span className="ml-2 text-xs">※8文字以上</span>
							<FormControl>
								<Input
									// placeholder="123456"
									className="w-button"
									{...field}
								/>
							</FormControl>

							<FormMessage className="w-72 text-xs text-primary-red" />
						</FormItem>
					)}
				/>
				<Button
					type="button"
					variant={"blue"}
					onClick={() => onNext()}
				>
					次へ
				</Button>
			</form>
		</Form>
	);
};
