import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import {  
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpStepOne } from '@/components/signup/SignUpStepOne';
import { SignUpStepTwo } from '@/components/signup/SignUpStepTwo';
import { Stepper } from '@/components/layout/Stepper'
import { SignUpStepThree } from '@/components/signup/SignUpStepThree';
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { SignUpSchema, signUpResolver, signUpStepOneSchema, signUpStepTwoSchema } from '@/schema/signup';
import { AiOutlineLeft } from 'react-icons/ai'; 


export enum STEPS {
  FORM = 0,
  PROFILE = 1,
  CONFIRM = 2,
}

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState(STEPS.FORM);
  const [complete, setComplete] = useState<boolean>(false);

  const navigate = useNavigate();
  const form = useForm<SignUpSchema>({
    defaultValues: {
      email: '',
      password: '',
      username: '',
      profilePicture: '',
    },
    mode: "onChange",
    resolver: signUpResolver,
  });


  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    const currentSchema = step === STEPS.FORM ? signUpStepOneSchema : signUpStepTwoSchema;
    const result = currentSchema.safeParse(form.getValues());
    if (result.success) {
      setStep((value) => value + 1);
    }
  }

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    setIsLoading(true);

    axios.post('http://localhost:8000/api/auth/signup', data)
    .then(() => {
      toast.success('Successfully registered!');
      setStep(STEPS.FORM)
      navigate('/login');
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }


  const getSectionComponent = () => {
    switch (step) {
      case STEPS.FORM:
        return <SignUpStepOne form={form} onNext={onNext} /> ;
      case STEPS.PROFILE:
        return <SignUpStepTwo form={form} onNext={onNext} onBack={onBack} /> ;
      case STEPS.CONFIRM:
        return <SignUpStepThree form={form} onSubmit={onSubmit} onBack={onBack}/> ;
      default:
        return <div>Unknown step</div>;
    }
  }
  

  return (
    <>
      <div className='my-24 flex flex-col items-center gap-y-4'>
      <div className="flex justify-between items-center py-2 w-[300px]">
          <Link to="/">
            <AiOutlineLeft className="text-lg" />
          </Link>
          <div className='text-2xl font-semibold flex-1 text-center'>新規登録</div>
          <div style={{ width: 24 }} /> 
        </div>
        <Stepper currentStep={step} complete={complete} />
        <Separator className='my-4 w-[300px]' />
        {getSectionComponent()}
        <Button 
          variant="link" 
          className="text-blue-500 text-xs"
          onClick={() => navigate('/login')}
        >
          既にアカウントをお持ちの方はこちら
        </Button>
      </div>
    </>
  )

}