"use client";

import { EditService } from "../../services/components/edit-serrvice/EditService";
import { useServices } from "../../services/hooks/useServices";
import { ProfileForm } from "../components/profile-form/ProfileForm";
import { useProfile } from "../hooks/useProfile";

export const Profile = () => {
  const { profile, isSuccess } = useProfile();
  const { services, deleteService } = useServices();

  const handleDelete = (serviceId: string) => deleteService.mutate(serviceId);
  const handleEdit = (serviceId: string) => deleteService.mutate(serviceId);

  return isSuccess ? (
    <>
      <title>Profile • Hedge.gg</title>
      <h1>Profile</h1>
      <h2>Integrations</h2>
      <ProfileForm profile={profile} />
      <h2>Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.name}
            <button onClick={() => handleEdit(service.id)} type="button">
              Edit
            </button>
            <button onClick={() => handleDelete(service.id)} type="button">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <EditService />
    </>
  ) : null;
};
