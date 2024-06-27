import { Stepper } from '@/components/layout/Stepper'
import { SignUpStepOne } from '@/components/signup/SignUpStepOne'
import { SignUpStepThree } from '@/components/signup/SignUpStepThree'
import { SignUpStepTwo } from '@/components/signup/SignUpStepTwo'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import {
  type SignUpSchema,
  signUpResolver,
  signUpStepOneSchema,
  signUpStepTwoSchema,
} from '@/schema/signup'
import axios from 'axios'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { IoIosArrowBack } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginError, loginStart, loginSuccess } from '../redux/userSlice'

export enum STEPS {
  FORM = 0,
  PROFILE = 1,
  CONFIRM = 2,
}

export const SignUp = () => {
  const [step, setStep] = useState(STEPS.FORM)
  const [complete] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string>('')
  const { toast } = useToast()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const form = useForm<SignUpSchema>({
    defaultValues: {
      email: '',
      password: '',
      username: '',
      profilePicture: '',
    },
    mode: 'onBlur',
    resolver: signUpResolver,
  })

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

  const onSubmit: SubmitHandler<SignUpSchema> = data => {
    dispatch(loginStart())

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, data)
      .then(res => {
        dispatch(loginSuccess(res.data))
        // toast.success("Successfully registered!");
        // toast({
        //   title: "Scheduled: Catch up",
        //   description: "Friday, February 10, 2023 at 5:57 PM",
        // })
        setStep(STEPS.FORM)
        navigate('/?showModal=true&modalType=registration')
      })
      .catch(err => {
        dispatch(loginError(err.response.data.error))
        // toast.error("Something went wrong.");
        toast({
          variant: 'destructive',
          title: `${err.response.data.error}`,
          description: 'Please try again later.',
        })
      })
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
