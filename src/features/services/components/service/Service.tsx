import { Tooltip } from "../../../../components/tooltip/Tooltip";
import { useTooltip } from "../../../../hooks/useTooltip";
import type { Service as TService } from "../../types";
import styles from "./Service.module.css";

type ServiceProps = {
  service: TService;
};

export const Service = ({ service }: ServiceProps) => {
  const { name, href, icon, abbr } = service;

  const { tooltipRef, toggleTooltip } = useTooltip();

  return (
    <li className={styles.service}>
      <a
        className={styles.link}
        href={href}
        onMouseEnter={toggleTooltip}
        onMouseLeave={toggleTooltip}
        popoverTarget={`service-${abbr}`}
        popoverTargetAction="toggle"
        rel="noopener noreferrer"
      >
        <img alt={`${name} icon`} className={styles.icon} src={icon} />
        <Tooltip id={`service-${abbr}`} ref={tooltipRef}>
          {name}
        </Tooltip>
      </a>
    </li>
  );
};
