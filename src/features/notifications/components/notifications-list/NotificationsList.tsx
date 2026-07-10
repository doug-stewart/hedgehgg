"use client";

import { useNotifications } from "../../store/notifications.store";
import { NotificationCard } from "../notification-card/NotificationCard";

export const NotificationsList = () => {
  const notifications = useNotifications();
  return notifications.length > 0 ? (
    <ul>
      {notifications.map((n) => (
        <NotificationCard info={n} key={n.id} />
      ))}
    </ul>
  ) : null;
};
