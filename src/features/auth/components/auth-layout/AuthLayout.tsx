import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useSession } from "../../hooks/useSession";

export const AuthLayout = () => {
  const { isLoggedIn, isPending } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !isPending) {
      navigate("/");
    }
  }, [isLoggedIn, isPending, navigate]);

  return isLoggedIn ? <Outlet /> : <p>Please log in</p>;
};
