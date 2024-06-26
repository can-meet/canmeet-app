import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { NotificationType } from "@/types/notification"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type NotificationCardProps = {
  notification: NotificationType
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const navigate = useNavigate()
  const handleNotificationAsRead = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/notifications/${notification._id}`,
      )
      navigate(`/products/${response.data.product}`)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <button
      className={`flex items-center justify-between cursor-pointer ${notification.isRead ? 'opacity-50' : ''}`}
      onClick={handleNotificationAsRead}
      type='button'
    >
      <div className='flex gap-x-3'>
        <Avatar className='rounded-full h-9 w-9 object-cover cursor-pointer self-center'>
          <AvatarImage src={notification.sender.profilePicture} />
          <AvatarFallback>PROFILE IMAGE</AvatarFallback>
        </Avatar>
        <div className='pr-4'>
          <p className='text-xs break-all'>{notification.content}</p>
        </div>
      </div>
      <img
        src={notification.product.images[0]}
        alt='transaction product'
        className='w-10 h-13'
      />
    </button>
  )
}
