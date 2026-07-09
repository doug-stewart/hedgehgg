import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/helpers/queryClient";
import { Home } from "@/routes/Home";

export default function HomePage() {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
}
