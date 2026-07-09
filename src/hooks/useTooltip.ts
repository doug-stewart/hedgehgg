"use client";

import { useRef } from "react";

export const useTooltip = () => {
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const toggleTooltip = () => {
    tooltipRef?.current?.togglePopover();
  };

  return { tooltipRef, toggleTooltip };
};
