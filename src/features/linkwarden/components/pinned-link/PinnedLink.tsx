import { useId } from "react";
import { Button } from "@/components/button/Button";
import { Tooltip } from "@/components/tooltip/Tooltip";
import { useTooltip } from "@/hooks/useTooltip";
import { getAbbr } from "../../helpes/getAbbr";
import { useSelfhstIcons } from "../../hooks/useSelfhstIcons";
import type { LinkwardenLink } from "../../types";
import styles from "./PinnedLink.module.css";

export const PinnedLink = ({ link }: { link: LinkwardenLink }) => {
  const id = useId();
  const { tooltipRef, showTooltip, hideTooltip } = useTooltip();
  const { getIconUrl } = useSelfhstIcons();

  const icon = getIconUrl(link.name);
  const abbr = getAbbr(link.name);

  return (
    <li aria-labelledby={`pin-${id}`} className={styles.item} key={link.id}>
      <Button
        className={styles.link}
        href={link.url}
        onBlur={hideTooltip}
        onFocus={showTooltip}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {icon ? (
          <span
            className={styles.icon}
            style={{ "--svg": `url(${icon})` } as React.CSSProperties}
          ></span>
        ) : (
          <span className={styles.abbr}>{abbr}</span>
        )}
        <Tooltip id={`pin-${id}`} ref={tooltipRef}>
          {link.name}
        </Tooltip>
      </Button>
    </li>
  );
};
