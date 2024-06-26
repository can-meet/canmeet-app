import { NotificationType } from "@/types/notification";
import { NotificationCard } from "./NotificationCard";

type NotificationListProps = {
  notifications: NotificationType[];
};

export const NotificationList = ({ notifications }: NotificationListProps) => {

  return (
    <div className='px-4 flex flex-col gap-y-2 max-w-96'>
      {notifications.map((notification) => (
        <NotificationCard 
          key={notification._id} 
          notification={notification} />
      ))}
    </div>
  )
}