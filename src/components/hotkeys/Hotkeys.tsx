import { useHotkey } from "@tanstack/react-hotkeys";
import { useQueryClient } from "@tanstack/react-query";

export const Hotkeys = () => {
  const queryClient = useQueryClient();
  useHotkey("Shift+R", () => {
    queryClient.invalidateQueries({ refetchType: "all" });
  });
  return null;
};
