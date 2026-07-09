"use client";

import { useMutation } from "@tanstack/react-query";
import { useWeather } from "../../weather/hooks/useWeather";
import { setTheme } from "../api/setTheme";
import { normalizeTheme } from "../helpers/normalizeTheme";
import type { ThemeValue } from "../types";
import { useProfile } from "./useProfile";

export const useTheme = () => {
  const { profile } = useProfile();
  const { forecast } = useWeather();

  const theme: ThemeValue = profile?.theme ?? "dark";
  const display: ThemeValue = normalizeTheme(profile?.theme ?? null, forecast?.isDay ?? true);

  const setMutation = useMutation({ mutationFn: setTheme });

  return { theme, display, setTheme: setMutation };
};
