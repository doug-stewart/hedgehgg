import clsx from "clsx";
import Link from "next/link";
import { useId } from "react";
import { Tooltip } from "@/components/tooltip/Tooltip";
import { useTheme } from "@/features/user/hooks/useTheme";
import { useTooltip } from "@/hooks/useTooltip";
import { getAbbr } from "../../helpes/getAbbr";
import { useSelfhstIcons } from "../../hooks/useSelfhstIcons";
import type { LinkwardenLink } from "../../types";
import styles from "./PinnedLink.module.css";

export const PinnedLink = ({ link }: { link: LinkwardenLink }) => {
  const id = useId();
  const { tooltipRef, showTooltip, hideTooltip, toggleTooltip } = useTooltip();
  const { getIconUrl } = useSelfhstIcons();
  const { display: theme } = useTheme();

  const icon = getIconUrl(link.name);
  const colorIcon = icon?.replace(`-${theme === "light" ? "dark" : "light"}`, "");
  const abbr = getAbbr(link.name);

  return (
    <li aria-labelledby={`pin-${id}`} className={styles.item} key={link.id}>
      <Link
        className={styles.link}
        href={link.url}
        onBlur={hideTooltip}
        onClick={toggleTooltip}
        onFocus={showTooltip}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {icon ? (
          <>
            {/* biome-ignore lint/performance/noImgElement: because */}
            <img
              alt=""
              className={clsx(styles.icon, styles.monochrome)}
              height={64}
              src={icon}
              width={64}
            />
            {/* biome-ignore lint/performance/noImgElement: because */}
            <img
              alt=""
              className={clsx(styles.icon, styles.color)}
              height={64}
              src={colorIcon}
              width={64}
            />
          </>
        ) : (
          <span className={styles.icon}>{abbr}</span>
        )}
        <Tooltip id={`pin-${id}`} ref={tooltipRef}>
          {link.name}
        </Tooltip>
      </Link>
    </li>
  );
};
