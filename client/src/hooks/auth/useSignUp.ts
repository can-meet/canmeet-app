import { signUpApi } from '@/api/auth/signup'
import { useToast } from '@/components/ui/use-toast'
import { type SignUpSchema, signUpResolver } from '@/schema/signup'
import { useAuthStore } from '@/store/authStore'
import axios from 'axios'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const useSignUp = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const setCurrentUser = useAuthStore(state => state.setCurrentUser)

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

  const onSubmit: SubmitHandler<SignUpSchema> = async data => {
    try {
      const res = await signUpApi({
        email: data.email,
        password: data.password,
        username: data.username,
        profilePicture: data.profilePicture,
      })
      toast({
        title: 'Successfully signup!',
      })
      navigate('/?showModal=true&modalType=registration')
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
