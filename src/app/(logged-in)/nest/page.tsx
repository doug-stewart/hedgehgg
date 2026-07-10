import { redirectIfNoSession } from "@/features/auth/helpers/redirectIfNoSession";
import { Nest } from "@/features/user/routes/Nest";

export default async function Page() {
  await redirectIfNoSession();
  return (
    <>
      <title>Your Nest • Hedge.gg</title>
      <Nest />
    </>
  );
}
