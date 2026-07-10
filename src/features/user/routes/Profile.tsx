"use client";

import { ServiceForm } from "@/features/services/components/service-form/ServiceForm";
import { EditService } from "../../services/components/edit-service/EditService";
import { useServices } from "../../services/hooks/useServices";
import { ProfileForm } from "../components/profile-form/ProfileForm";
import { useProfile } from "../hooks/useProfile";

export const Profile = () => {
  const { profile, isSuccess } = useProfile();
  const { services, deleteService } = useServices();

  const handleDelete = (serviceId: string) => deleteService.mutate(serviceId);

  return isSuccess ? (
    <>
      <h1>Settings</h1>
      <h2>Integrations</h2>
      <ProfileForm profile={profile} />
      <h2>Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.name}
            <EditService service={service} />
            <button onClick={() => handleDelete(service.id)} type="button">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <ServiceForm />
    </>
  ) : null;
};
