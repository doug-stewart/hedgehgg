import { redirectIfNoSession } from "@/features/auth/helpers/redirectIfNoSession";
import { Profile } from "@/features/user/routes/Profile";

export default async function Page() {
  await redirectIfNoSession();
  return (
    <>
      <title>Settings • Hedge.gg</title>
      <Profile />
    </>
  );
}
