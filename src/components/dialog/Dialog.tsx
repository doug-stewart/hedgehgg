import clsx from "clsx";
import { type PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Dialog.module.css";

type DialogProps = PropsWithChildren<{
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  className?: string;
  showClose?: boolean;
  closeClassName?: string;
}>;

export const Dialog = ({
  dialogRef,
  children,
  className,
  showClose,
  closeClassName,
}: DialogProps) => {
  const closeDialog = () => dialogRef.current?.close();

  useEffect(() => {
    const close = (event: MouseEvent) => {
      // Note to future me: Dialogs can have a ::backdrop pseudo-element that counts towards click
      // events so we can't do the "does the dialog contain the event target" trick here.
      if (dialogRef.current === null || !dialogRef.current.open) return;
      const dialogRect = dialogRef.current.getBoundingClientRect();

      const isClickedOutside =
        event.clientX < dialogRect.left ||
        event.clientX > dialogRect.right ||
        event.clientY < dialogRect.top ||
        event.clientY > dialogRect.bottom;

      if (isClickedOutside) {
        dialogRef.current.close();
      }
    };

    document.addEventListener("click", close, { capture: true });
    return () => document.removeEventListener("click", close, { capture: true });
  }, [dialogRef]);

  return createPortal(
    <dialog className={clsx(styles.dialog, className)} ref={dialogRef}>
      {showClose && (
        <button
          className={clsx(styles.close, closeClassName)}
          onClick={closeDialog}
          title="Close"
          type="button"
        >
          <span role="presentation">&times;</span>
        </button>
      )}
      {children}
    </dialog>,
    document.body,
  );
};
