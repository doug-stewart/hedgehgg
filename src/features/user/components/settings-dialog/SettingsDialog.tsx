import { useHotkey } from "@tanstack/react-hotkeys";
import { Dialog } from "@/components/dialog/Dialog";
import { useDialog } from "@/hooks/useDialog";
import { useProfile } from "../../hooks/useProfile";
import { ProfileForm } from "../profile-form/ProfileForm";

export const SettingsDialog = ({ buttonClassName }: { buttonClassName?: string }) => {
  const { dialogRef, openDialog } = useDialog();
  const { profile } = useProfile();

  const openSettings = () => {
    openDialog();
  };

  useHotkey({ key: ".", shift: true }, () => openSettings());

  return (
    <>
      <button className={buttonClassName} onClick={openSettings} type="button">
        Settings
      </button>
      <Dialog dialogRef={dialogRef} showClose>
        <ProfileForm profile={profile} />
      </Dialog>
    </>
  );
};
