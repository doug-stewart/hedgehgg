import { useEffect } from "react";
import { NavLink } from "react-router";
import Hedgehgg from "../../../../assets/images/hedgehgg.svg?react";
import { ThemeSelect } from "../../../user/components/theme-select/ThemeSelect";
import { useTheme } from "../../../user/hooks/useTheme";
import { useSession } from "../../hooks/useSession";
import styles from "./UserHeader.module.css";

export const UserHeader = () => {
  const { login, logout, signup, isLoggedIn } = useSession();
  const { display } = useTheme();

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", display);
  }, [display]);

  return (
    <header className={styles.masthead}>
      <h1 className={styles.logo}>
        <Hedgehgg title="Hedgehgg" />
      </h1>
      <nav className={styles.nav}>
        <ul className={styles.items}>
          {isLoggedIn ? (
            <>
              <li className={styles.item}>
                <NavLink className={styles.action} to="/nest">
                  Your Nest
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink className={styles.action} to="/profile">
                  Settings
                </NavLink>
              </li>
              <li className={styles.item}>
                <button className={styles.action} onClick={logout} type="button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={styles.item}>
                <button className={styles.action} onClick={() => signup("hi@dou.gg")} type="button">
                  Sign Up
                </button>
              </li>
              <li className={styles.item}>
                <button className={styles.action} onClick={login} type="button">
                  Login
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <ThemeSelect className={styles.theme} />
    </header>
  );
};
