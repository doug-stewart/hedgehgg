import { RestrictToElement } from "@dnd-kit/dom/modifiers";
import { useSortable } from "@dnd-kit/react/sortable";
import { useServices } from "../../hooks/useServices";
import type { Service } from "../../types";
import { EditService } from "../edit-service/EditService";

type ServiceListItemProps = {
  container: React.RefObject<HTMLUListElement | null>;
  index: number;
  service: Service;
};

export const ServiceListItem = ({ container, index, service }: ServiceListItemProps) => {
  const { deleteService } = useServices();

  const { ref } = useSortable({
    id: service.id,
    index,
    modifiers: [
      RestrictToElement.configure({
        element: () => container.current,
      }),
    ],
  });

  const handleDelete = (serviceId: Service["id"]) => deleteService.mutate(serviceId);

  return (
    <li data-order={service.sort_order} ref={ref}>
      {service.name}
      <EditService service={service} />
      <button onClick={() => handleDelete(service.id)} type="button">
        Delete
      </button>
    </li>
  );
};
