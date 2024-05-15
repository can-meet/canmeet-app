import "@/App.css";
import type { STEPS } from "@/pages/SignUp";
import { FaCheck } from "react-icons/fa6";

type StepperProps = {
	currentStep: STEPS;
	complete: boolean;
};

export const Stepper = ({ currentStep, complete }: StepperProps) => {
	const steps = ["アカウント登録", "プロフィール設定", "確認・完了"];
	return (
		<>
			<div className="flex justify-center">
				{steps?.map((step, i) => (
					<div
						key={i}
						className={`step-item ${currentStep === i && "active"} ${
							(i < currentStep || complete) && "complete"
						} `}
					>
						<div className="step">
							{i < currentStep || complete ? <FaCheck size={18} /> : i + 1}
						</div>
						<p className="text-default-black text-xs mt-2">{step}</p>
					</div>
				))}
			</div>
		</>
	);
};
