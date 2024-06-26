import { create } from 'zustand';
import axios from 'axios';
import { NotificationType } from '@/types/notification';

type NotificationState = {
  notifications: NotificationType[];
  fetchNotifications: (userId: string) => void;
}

export const useNotificationsStore = create<NotificationState>((set) => ({
  notifications: [],
  fetchNotifications: async (userId: string) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/notifications/users/${userId}`);
      set({ notifications: data });
    } catch (err) {
      console.error(err);
    }
  },
}));