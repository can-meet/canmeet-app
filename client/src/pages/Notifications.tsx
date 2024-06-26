import { Loading } from "@/components/layout/loading/Loading"
import { NotificationList } from "@/components/notification/NotificationList"
import { useEffect, useState } from "react"
import { useNotificationsStore } from "@/store/notificationsStore"
import { useAuthStore } from "@/store/authStore"


export const Notifications = () => {
  const { currentUser } = useAuthStore();
	const { notifications, fetchNotifications } = useNotificationsStore();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      setLoading(true)
      fetchNotifications(currentUser._id)
      setLoading(false)
    }
  }, [currentUser, currentUser?._id, fetchNotifications])

  if (isLoading) {
    return <Loading />
  }

  if (notifications.length === 0) {
    return (
      <div className='my-20 flex justify-center gap-y-6'>
        <p className='text-center text-lg font-semibold px-4'>
          通知はありません
        </p>
      </div>
    )
  }

  return (
    <div className='my-20 flex flex-col items-center justify-center'>
      <NotificationList notifications={notifications} />
    </div>
  )
}
