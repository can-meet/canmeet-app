import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserType } from '@/types/user';

type AuthStore = {
  currentUser: UserType | null;
  setCurrentUser: (user: UserType | null) => void;
  clearCurrentUser: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      clearCurrentUser: () => set({ currentUser: null }),
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);
