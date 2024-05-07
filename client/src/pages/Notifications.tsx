import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Loading } from "@/components/layout/Loading";
import { NotificationList } from "@/components/notification/NotificationList";
import { useEffect, useState } from "react";
import { useNotificationsStore } from "@/store/notificationsStore";


export const Notifications = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
	const { notifications, fetchNotifications } = useNotificationsStore();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      setLoading(true)
      fetchNotifications(currentUser._id);
      setLoading(false)
    }
  }, []);

  if (isLoading) {
    return (
      <Loading />
    )
  }

  if (notifications.length === 0) {
    return <div className='my-20 flex justify-center gap-y-6'>
      <p className='text-center text-lg font-semibold w-[400px] px-6'>通知はありません</p>
    </div>
  }

  return (
    <div className='my-20 flex flex-col items-center justify-center'>
      <NotificationList notifications={notifications} />
		</div>
  )
}
