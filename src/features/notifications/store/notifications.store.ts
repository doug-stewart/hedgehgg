import { create } from "zustand";
import type { Notification } from "../types";

export type NotificationStore = {
  notifications: Array<Notification>;
  actions: {
    addNotification: (notification: Omit<Notification, "id">) => void;
    removeNotification: (id: Notification["id"]) => void;
  };
};

const useNotificationsStore = create<NotificationStore>()((set) => ({
  notifications: [],
  actions: {
    addNotification: (notification) => {
      set((state) => ({
        notifications: [...state.notifications, { id: crypto.randomUUID(), ...notification }],
      }));
    },
    removeNotification: (id) => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    },
  },
}));

export const useNotifications = () => useNotificationsStore((state) => state.notifications);
export const useNotificationsActions = () => useNotificationsStore((state) => state.actions);
