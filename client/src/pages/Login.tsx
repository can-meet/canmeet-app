import { LoginForm } from "@/components/login/LoginForm";
import { Button } from "@/components/ui/button";
import { type LoginSchema, loginResolver } from "@/schema/login";
import axios from "axios";
import { type SubmitHandler, useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginError, loginStart, loginSuccess } from "../redux/userSlice";
import { useToast } from "@/components/ui/use-toast";

export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { toast } = useToast()

	const form = useForm<LoginSchema>({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onBlur",
		resolver: loginResolver,
	});

	const onSubmit: SubmitHandler<LoginSchema> = (data) => {
		dispatch(loginStart());

		axios
			.post(`${import.meta.env.VITE_API_URL}/auth/login`, data)
			.then((res) => {
				dispatch(loginSuccess(res.data));
				toast({
          title: `Successfully logged in!`,
        })
				navigate("/");
			})
			.catch((err) => {
				dispatch(loginError(err.response.data.error));
				toast({
					variant: "destructive",
          title: `${err.response.data.message}`,
          description: "Please check your entry and try again.",
        })
			});
	};

	return (
		<>
			<div className="my-24 max-w-96 mx-auto">
				<div className="w-72 mx-auto">
					<Link to="/">
						<IoIosArrowBack className="text-2xl" />
					</Link>
				</div>
				<div className="flex flex-col items-center mt-4">
					<h3 className="text-lg font-semibold text-center mb-6">ログイン</h3>
					<LoginForm form={form} onSubmit={onSubmit} />
					<Button
						variant="link"
						className="text-blue-500 text-xs"
						onClick={() => navigate("/signup")}
					>
						新規登録される方はこちら
					</Button>
				</div>
			</div>
		</>
	);
};
