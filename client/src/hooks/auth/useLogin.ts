import { loginApi } from '@/api/auth/login'
import { useToast } from '@/components/ui/use-toast'
import { type LoginSchema, loginResolver } from '@/schema/login'
import { useAuthStore } from '@/store/authStore'
import axios from 'axios'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const setCurrentUser = useAuthStore(state => state.setCurrentUser)

  const form = useForm<LoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: loginResolver,
  })

  const onSubmit: SubmitHandler<LoginSchema> = async data => {
    try {
      const res = await loginApi({
        email: data.email,
        password: data.password,
      })
      toast({
        title: 'Successfully logged in!',
      })
      navigate('/')
      setCurrentUser(res.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast({
            variant: 'destructive',
            title: `${error.response.data.message}`,
            description: 'Please check your entry and try again.',
          })
        } else {
          console.error('Error:', error)
          toast({
            variant: 'destructive',
            title: 'An unexpected error occurred',
            description: 'Please try again later.',
          })
        }
      }
    }
  }

  return {
    form,
    onSubmit,
  }
}
