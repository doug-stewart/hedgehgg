"use client";

import { useRef } from "react";
import type { Service } from "../../types";
import { ServiceForm } from "../service-form/ServiceForm";

type EditServiceProps = {
  service: Service;
  className?: string;
};

export const EditService = ({ service, className }: EditServiceProps) => {
  const dialog = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialog.current?.showModal();
  };

  const closeDialog = () => {
    dialog.current?.close();
  };

  return (
    <>
      <button className={className} onClick={openDialog} type="button">
        Edit
      </button>
      <dialog ref={dialog}>
        <button onClick={closeDialog} type="button">
          Close
        </button>
        <ServiceForm onSubmit={closeDialog} service={service} />
      </dialog>
    </>
  );
};
