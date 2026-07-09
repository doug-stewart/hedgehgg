import { redirectIfNoSession } from "@/features/auth/helpers/redirectIfNoSession";
import { Profile } from "@/features/user/routes/Profile";

export default function Page() {
  redirectIfNoSession();
  return <Profile />;
}
