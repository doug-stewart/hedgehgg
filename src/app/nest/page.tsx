import { redirectIfNoSession } from "@/features/auth/helpers/redirectIfNoSession";
import { Nest } from "@/features/user/routes/Nest";

export default function Page() {
  redirectIfNoSession();
  return <Nest />;
}
