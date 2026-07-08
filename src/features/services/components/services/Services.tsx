import { useServices } from "../../hooks/useServices";
import { Service } from "../service/Service";

import styles from "./Services.module.css";

export const Services = () => {
  const { services } = useServices();
  return (
    <ul className={styles.list}>
      {services.map((service) => (
        <Service key={service.href} service={service} />
      ))}
    </ul>
  );
};
