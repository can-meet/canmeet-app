import { Stepper } from '@/components/layout/Stepper'
import { SignUpStepOne } from '@/components/signup/SignUpStepOne'
import { SignUpStepThree } from '@/components/signup/SignUpStepThree'
import { SignUpStepTwo } from '@/components/signup/SignUpStepTwo'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSignUp } from '@/hooks/auth/useSignUp'
import { signUpStepOneSchema, signUpStepTwoSchema } from '@/schema/signup'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'

export enum STEPS {
  FORM = 0,
  PROFILE = 1,
  CONFIRM = 2,
}

export const SignUp = () => {
  const [step, setStep] = useState(STEPS.FORM)
  const [complete] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string>('')
  const navigate = useNavigate()
  const { form, onSubmit } = useSignUp()

  const onBack = () => {
    setStep(value => value - 1)
  }

  const onNext = () => {
    const currentSchema =
      step === STEPS.FORM ? signUpStepOneSchema : signUpStepTwoSchema
    const result = currentSchema.safeParse(form.getValues())
    if (result.success) {
      setStep(value => value + 1)
    }
  }

  const getSectionComponent = () => {
    switch (step) {
      case STEPS.FORM:
        return <SignUpStepOne form={form} onNext={onNext} />
      case STEPS.PROFILE:
        return (
          <SignUpStepTwo
            form={form}
            onNext={onNext}
            onBack={onBack}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
        )
      case STEPS.CONFIRM:
        return (
          <SignUpStepThree
            form={form}
            onSubmit={onSubmit}
            onBack={onBack}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
        )
      default:
        return <div>Unknown step</div>
    }
  }

  return (
    <>
      <div className='my-24 max-w-96 mx-auto'>
        {step === STEPS.FORM ? (
          <div className='w-72 mx-auto'>
            <Link to='/'>
              <IoIosArrowBack className='text-2xl' />
            </Link>
          </div>
        ) : null}
        <h3 className='text-lg font-semibold text-center mt-4 mb-10'>
          新規登録
        </h3>
        <div className='flex flex-col items-center'>
          <Stepper currentStep={step} complete={complete} />
          <Separator className='mt-4 w-64 bg-secondary-gray' />
          {getSectionComponent()}
          <Separator className='mt-4 w-72 bg-secondary-gray' />
          <Button
            variant='link'
            className='flex items-center gap-4 my-4 mb-5 bg-gray-100 hover:no-underline hover:bg-gray-200'
            // onClick={() => navigate("/signup")}
          >
            <FcGoogle className='h-4 w-4' />
            Googleでログインする
          </Button>
          <Button
            variant='link'
            className='text-primary-blue text-xs'
            onClick={() => navigate('/login')}
          >
            既にアカウントをお持ちの方はこちら
          </Button>
        </div>
      </div>
    </>
  )
}
