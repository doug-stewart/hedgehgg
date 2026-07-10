import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { useRef } from "react";
import { useServices } from "../../hooks/useServices";
import type { Services } from "../../types";
import { ServiceListItem } from "../service-list-item/ServiceListItem";

const moveService = (services: Services, from: number, to: number): Services => {
  const reordered = [...services];
  const [moved] = reordered.splice(from, 1);
  reordered.splice(to, 0, moved);
  return reordered;
};

export const ServiceList = () => {
  const { services, reorderServices } = useServices();
  const container = useRef<HTMLUListElement>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return;
    const { source } = event.operation;
    if (!isSortable(source) || source.index === source.initialIndex) return;
    const reordered = moveService(services, source.initialIndex, source.index);
    reorderServices.mutate(reordered.map((service) => service.id));
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <ul ref={container}>
        {services.map((service, index) => (
          <ServiceListItem container={container} index={index} key={service.id} service={service} />
        ))}
      </ul>
    </DragDropProvider>
  );
};
