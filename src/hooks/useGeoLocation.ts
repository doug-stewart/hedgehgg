import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/features/auth/hooks/useSession";
import { useProfile } from "@/features/user/hooks/useProfile";
import { LATITUDE, LONGITUDE } from "../config";

export const useGeoLocation = () => {
  const { session } = useSession();
  const { profile } = useProfile();
  const { geolocation_latitude, geolocation_longitude } = profile ?? {};

  const cityQuery = useQuery({
    queryKey: ["user", session?.id, "city"],
    queryFn: async () => {
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${geolocation_latitude ?? LATITUDE}&longitude=${geolocation_longitude ?? LONGITUDE}&localityLanguage=en`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch user city");
      }
      return response.json();
    },
    staleTime: Infinity,
    enabled: !!session?.id && !!geolocation_latitude && !!geolocation_longitude,
  });

  return { city: cityQuery.data?.city, isLoading: cityQuery.isLoading, error: cityQuery.error };
};
