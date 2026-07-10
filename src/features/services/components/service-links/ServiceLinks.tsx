"use client";

import { useServices } from "../../hooks/useServices";
import { ServiceLink } from "../service-link/ServiceLink";

import styles from "./ServiceLinks.module.css";

export const ServiceLinks = () => {
  const { services } = useServices();
  return (
    <ul className={styles.list}>
      {services.map((service) => (
        <ServiceLink key={service.href} service={service} />
      ))}
    </ul>
  );
};
