import { updateUserApi } from '@/api/user/updateUser'
import { useToast } from '@/components/ui/use-toast'
import { type UserSchema, userResolver } from '@/schema/user'
import { useAuthStore } from '@/store/authStore'
import axios from 'axios'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const useUpdateUser = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { currentUser, setCurrentUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<UserSchema>({
    defaultValues: {
      username: currentUser?.username,
    },
    mode: 'onChange',
    resolver: userResolver,
  })

  const onSubmit: SubmitHandler<UserSchema> = async data => {
    try {
      if (!currentUser) return
      const res = await updateUserApi({
        userId: currentUser?._id,
        username: data.username,
      })
      toast({
        title: 'Successfully change username!',
      })
      setCurrentUser(res.data)
      navigate('/profile')
      setIsEditing(false)
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
    isEditing,
    setIsEditing,
  }
}
