import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Notification } from "@/types/notification";
import { useNavigate } from 'react-router-dom';

type NotificationCardProps = {
  notification: Notification;
};


export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const navigate = useNavigate();
  const handleNotificationAsRead = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/notifications/${notification._id}`);
      navigate(`/products/${response.data.product}`)
    } catch (error) {
      console.error(error);
    }
  } 
  return (
    <div 
      className={`flex items-center justify-between cursor-pointer ${notification.isRead ? 'opacity-50' : ''}`}
      onClick={handleNotificationAsRead}
    >
      <div className='flex gap-x-3'>
        <Avatar className="rounded-full h-9 w-9 object-cover cursor-pointer self-center">
          <AvatarImage src={notification.sender.profilePicture} />
          <AvatarFallback>PROFILE IMAGE</AvatarFallback>
        </Avatar>
        <div className='pr-4'>
          <p className='text-xs break-all'>{notification.content}</p>
        </div>
      </div>
      <img src={notification.product.images[0]} alt="product image" className='w-10 h-13' />
    </div>
  )
}