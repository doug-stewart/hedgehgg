"use client";

import { ProfileForm } from "../components/profile-form/ProfileForm";
import { useProfile } from "../hooks/useProfile";

export const Profile = () => {
  const { profile, isSuccess } = useProfile();

  return isSuccess ? (
    <>
      <h1>Settings</h1>
      <ProfileForm profile={profile} />
    </>
  ) : null;
};
