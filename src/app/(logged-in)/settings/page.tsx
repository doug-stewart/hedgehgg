import { dehydrate, HydrationBoundary, queryOptions } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { authClient } from "@/features/auth/lib/auth-client";
import { getProfile } from "@/features/user/api/getProfile";
// import { ProfileForm } from "@/features/user/components/profile-form/ProfileForm";
import { getQueryClient } from "@/helpers/queryClient";

export default async function Page() {
  const session = await authClient.getSession();
  const userId = session.data?.user.id;

  if (!userId) {
    redirect("/");
  }

  const profile = queryOptions({
    queryKey: ["user", userId],
    queryFn: async () => getProfile(),
    staleTime: Infinity,
  });

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(profile);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <title>Settings • Hedge.gg</title>
      <h1>Settings</h1>
      {/*<ProfileForm profile={profile} />*/}
    </HydrationBoundary>
  );
}
