import { googleLoginApi } from '@/api/auth/googleAuth'
import { useToast } from '@/components/ui/use-toast'
import { auth, provider } from '@/lib/firebase'
import { useAuthStore } from '@/store/authStore'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const useGoogleAuth = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const setCurrentUser = useAuthStore(state => state.setCurrentUser)

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)

      if (result) {
        const { user } = result

        const res = await googleLoginApi({
          username: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
        })
        toast({
          title: 'Successfully logged in!',
        })
        navigate('/')
        setCurrentUser(res.data)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast({
            variant: 'destructive',
            title: 'Failed to log in',
            description: error.response.data.message || 'Please try again.',
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
    signInWithGoogle,
  }
}


