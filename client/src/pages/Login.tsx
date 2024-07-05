import { LoginForm } from '@/components/login/LoginForm'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useGoogleAuth } from '@/hooks/auth/useGoogleAuth'
import { useLogin } from '@/hooks/auth/useLogin'
import { FcGoogle } from 'react-icons/fc'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()
  const { form, onSubmit } = useLogin()
  const { signInWithGoogle } = useGoogleAuth()

  return (
    <>
      <div className='my-24 max-w-96 mx-auto'>
        <div className='flex flex-col items-center mt-10'>
          <div className='flex items-center justify-between w-72 mb-6'>
            <Link to='/'>
              <IoIosArrowBack className='text-2xl' />
            </Link>
            <h3 className='text-lg font-semibold text-center'>ログイン</h3>
            <div className='w-[24px]'></div>
          </div>
          <LoginForm form={form} onSubmit={onSubmit} />
          <Separator className='mt-4 w-72 bg-secondary-gray' />
          <Button
            variant='link'
            type='button'
            className='flex items-center gap-4 my-4 mb-5 text- bg-gray-100 hover:no-underline hover:bg-gray-200'
            onClick={signInWithGoogle}
          >
            <FcGoogle className='h-4 w-4' />
            Googleでログインする
          </Button>
          <Button
            variant='link'
            className='text-blue-500 text-xs'
            onClick={() => navigate('/signup')}
          >
            新規登録される方はこちら
          </Button>
        </div>
      </div>
    </>
  )
}
