import { LoginForm } from "@/components/login/LoginForm";
import { Button } from "@/components/ui/button";
import { type LoginSchema, loginResolver } from "@/schema/login";
import axios from "axios";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginError, loginStart, loginSuccess } from "../redux/userSlice";

export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
				toast.success("Successfully login!");
				navigate("/");
			})
			.catch((err) => {
				dispatch(loginError(err.response.data.error));
				toast.error("Something went wrong.");
			});
	};

	return (
		<>
			<div className="my-24 flex flex-col items-center gap-y-4">
				<div className="flex justify-between items-center py-2 w-[300px]">
					<Link to="/">
						<AiOutlineLeft className="text-lg" />
					</Link>
					<div className="text-2xl font-semibold flex-1 text-center">
						ログイン
					</div>
					<div style={{ width: 24 }} />
				</div>
				<LoginForm form={form} onSubmit={onSubmit} />
				<Button
					variant="link"
					className="text-blue-500 text-xs"
					onClick={() => navigate("/signup")}
				>
					新規登録される方はこちら
				</Button>
			</div>
		</>
	);
};
