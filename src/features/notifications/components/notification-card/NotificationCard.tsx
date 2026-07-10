"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNotificationsActions } from "../../store/notifications.store";
import type { Notification as NotificationType } from "../../types";
import styles from "./NotificationCard.module.css";

const DISMISS_DELAY = 5000;

export const NotificationCard = ({ info }: { info: NotificationType }) => {
  const { id, message, type } = info;
  const { removeNotification } = useNotificationsActions();
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering) return;
    const timer = setTimeout(() => removeNotification(id), DISMISS_DELAY);
    return () => clearTimeout(timer);
  }, [hovering, id, removeNotification]);

  return (
    <li
      className={clsx(styles[type])}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      role="alert"
    >
      {message}
    </li>
  );
};
