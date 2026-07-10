"use client";

import { ServiceForm } from "@/features/services/components/service-form/ServiceForm";
import { ServiceList } from "@/features/services/components/service-list/ServiceList";
import { ProfileForm } from "../components/profile-form/ProfileForm";
import { useProfile } from "../hooks/useProfile";

export const Profile = () => {
  const { profile, isSuccess } = useProfile();

  return isSuccess ? (
    <>
      <h1>Settings</h1>
      <h2>Integrations</h2>
      <ProfileForm profile={profile} />
      <h2>Services</h2>
      <ServiceList />
      <ServiceForm />
    </>
  ) : null;
};
