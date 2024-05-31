import { Notification } from "@/types/notification";
import { NotificationCard } from "./NotificationCard";

type NotificationListProps = {
  notifications: Notification[];
};

export const NotificationList = ({ notifications }: NotificationListProps) => {

  return (
    <div className='px-4 flex flex-col gap-y-2'>
      {notifications.map((notification) => (
        <NotificationCard 
          key={notification._id} 
          notification={notification} />
      ))}
    </div>
  )
}