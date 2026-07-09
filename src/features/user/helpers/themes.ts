import LightDark from "@/assets/images/light-dark.svg";
import MapPin from "@/assets/images/map-pin.svg";
import Moon from "@/assets/images/moon.svg";
import Sun from "@/assets/images/sun.svg";
import type { InlineSVG } from "@/types";
import type { ThemeValue } from "../types";

export const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: LightDark },
  { value: "geolocation", label: "Geolocation", icon: MapPin },
] as Array<{ value: ThemeValue; label: string; icon: InlineSVG }>;
